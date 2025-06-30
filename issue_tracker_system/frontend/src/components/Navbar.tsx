import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";

export default function Navbar() {
    const {logout, user} = useAuth();

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
        marginRight: 1,
        '&.active': {
            fontWeight: 'bold',
            borderBottom: '1px solid white'
        }
    };
    return (
        <AppBar position="static">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6">Hello {user?.name}</Typography>
                <Box>
                    {user?.role === 'ADMIN' && (
                        <Button
                            component={NavLink}
                            to="/home"
                            sx={linkStyle}
                        >
                            Home
                        </Button>)}
                    {user?.role === 'ADMIN' && (
                        <Button
                            component={NavLink}
                            to="/users"
                            sx={linkStyle}
                        >
                            Users
                        </Button>)}
                    {user?.role === 'ADMIN' && (
                        <Button
                            component={NavLink}
                            to="/teams"
                            sx={linkStyle}
                        >
                            Teams
                        </Button>
                    )}
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}