import React, {useEffect, useState} from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.tsx";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { user, login, isAuthenticated } = useAuth()!;
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    };

    useEffect(() => {
        if (isAuthenticated ) {
            if (user?.role === 'ADMIN'){
                navigate('/users');
            }
            else {
                navigate('/home');
            }
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!password.trim()){
            setError('Password cannot be empty.');
            return;
        }
        setLoading(true);

        try {
            const userRole = await login(email, password);
            if (userRole === 'ADMIN') {
                navigate('/users');
            } else {
                navigate('/home');
            }
        } catch (err : unknown) {
            setError(err instanceof Error ? err.message : 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
            }}
        >
            <Paper
                sx={{
                    width: '30%',
                    maxWidth: '40%',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Issue Tracker
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, mb: 2, py: 1.5 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;