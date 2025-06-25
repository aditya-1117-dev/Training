import React from 'react';
import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import {useAuth} from '../hooks/useAuth';

type ILayout = {
    children: React.ReactNode;
};

export default function Layout({children}: ILayout) {
    const {logout, user} = useAuth();
    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6">Hello {user?.name}</Typography>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Box sx={{mt: 2, px: 2}}>
                {children}
            </Box>
        </Box>
    );
}