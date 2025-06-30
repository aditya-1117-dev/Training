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
import {useAuth} from "../hooks/useAuth.ts";
import {useSnackbar} from "../hooks/useSnackBar.ts";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { user, login, isAuthenticated, loading : authLoading } = useAuth()!;
    const navigate = useNavigate();
    const { addSnackbar} = useSnackbar();

    const validateEmail = (email: string): boolean => {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    };

    useEffect(() => {
        if (isAuthenticated ) {
            navigate('/home');
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            addSnackbar({ severity : 'error', message : 'Please enter a valid email address' })
            return;
        }
        if (!password.trim()){
            addSnackbar({ severity : 'error', message : 'Password cannot be empty' })
            return;
        }
        setLoading(true);

        try {
            const userRole = await login(email, password);
            if (userRole) {
                navigate('/home');
            }
        } catch (err : unknown) {
            addSnackbar({ severity : 'error', message : err instanceof Error ? err.message : 'Invalid credentials' })
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
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