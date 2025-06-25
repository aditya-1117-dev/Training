import React, {useEffect, useState} from "react";
import type {IUser} from "../../types/userTypes.tsx";
import {getRequest, postRequest} from "../../utils/apiClient.tsx";
import { AuthContext } from "./AuthContext.tsx";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    async function getCurrentUser(token: string): Promise<IUser | null> {
        const currentUser = await getRequest<IUser>(`http://localhost:3000/api/auth/me`, {
            Authorization: `Bearer ${token}`,
        });
        if (!currentUser) {
            throw new Error('Failed to fetch current user');
        }
        return currentUser?.data ? currentUser.data : null;
    }

    const login = async (email: string, password: string): Promise<void | string> => {
        setLoading(true);
        const response = await postRequest<{ token: string, user: IUser }, { email: string, password: string }>(
            'http://localhost:3000/api/auth/login',
            { email, password }
        );

        if (response.success && response.data) {
            const { token } = response.data;
            localStorage.setItem('token', token);
            setToken(token);
            return response.data.user.role === 'ADMIN' ? 'ADMIN' : 'USER';
        } else {
            const errorMessage = response.error?.message || 'Login failed. Please try again.';
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const userData = await getCurrentUser(token);
                    setUser(userData);
                } catch (error : unknown) {
                    logout();
                    if (error instanceof Error && error.message.includes('401')) {
                        console.error('Unauthorized access, logging out');
                    } else {
                        console.error('An error occurred while fetching user data:', error);
                    }
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};