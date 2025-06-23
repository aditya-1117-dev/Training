import React, {useEffect, useState} from "react";
import type {ILoginResponse} from "../../types/apiTypes.tsx";
import {getRequest, postRequest} from "../../utils/apiClient.tsx";
import { AuthContext } from "./AuthContext.tsx";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<ILoginResponse | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    async function getCurrentUser(token: string): Promise<ILoginResponse | null> {
        const currentUser = await getRequest<ILoginResponse>(`http://localhost:3000/api/auth/me`, {
            Authorization: `Bearer ${token}`,
        });
        if (!currentUser) {
            throw new Error('Failed to fetch current user');
        }
        return currentUser?.data ? currentUser.data : null;
    }

    const login = async (email: string, password: string) : Promise<void> => {
        setLoading(true);
        try {
            const response = await postRequest<{ token: string, user : ILoginResponse }, {email:string, password: string}>('http://localhost:3000/api/auth/login', {
                email,
                password
            });

            if (response.data){
                const { token } = response.data;
                localStorage.setItem('token', token);
                setToken(token);
            }
        } catch (error : unknown) {
            console.error('Login failed:', error);
            if (error instanceof Error) {
                if (error.message.includes('401')) {
                    alert('Invalid email or password');
                }
            } else {
                console.error('An error occurred during login. Please try again.');
            }
        } finally {
            setLoading(false);
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
        console.log("Logging out user");
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