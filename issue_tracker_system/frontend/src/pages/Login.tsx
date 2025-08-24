import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Paper,
} from '@mui/material';
import {useLogin} from "../hooks/componentHooks/useLogin.ts";

const Login: React.FC = () => {
    const {email, password, loading, authLoading, setEmail, setPassword, handleSubmit} = useLogin();

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
                <CircularProgress/>
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
                elevation={24}
            >
                <Typography variant="h4" component="h1" gutterBottom> Issue Tracker</Typography>
                <Typography variant="h6" component="h2" gutterBottom> Sign In</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{width: '100%'}}>
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
                        sx={{mt: 2, mb: 2, py: 1.5}}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24}/> : 'Login'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;