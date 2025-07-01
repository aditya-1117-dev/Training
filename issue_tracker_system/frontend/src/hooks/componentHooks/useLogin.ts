import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../customHooks/useAuth.ts";
import {useSnackbar} from "../customHooks/useSnackBar.ts";

export const useLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { login, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { addSnackbar } = useSnackbar();

    const validateEmail = (email: string): boolean => {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            addSnackbar({ severity: 'error', message: 'Please enter a valid email address' });
            return;
        }
        if (!password.trim()) {
            addSnackbar({ severity: 'error', message: 'Password cannot be empty' });
            return;
        }
        setLoading(true);

        try {
            const userRole = await login(email, password);
            if (userRole) {
                navigate('/home');
            }
        } catch (err: unknown) {
            addSnackbar({ severity: 'error', message: err instanceof Error ? err.message : 'Invalid credentials' });
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        password,
        loading,
        authLoading,
        setEmail,
        setPassword,
        handleSubmit,
    };
};