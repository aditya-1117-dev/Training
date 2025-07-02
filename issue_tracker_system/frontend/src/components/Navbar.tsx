import {AppBar, Box, Button, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useNavbar} from "../hooks/componentHooks/useNavbar.ts";

export default function Navbar() {
    const {
        user,
        logout,
        linkStyle
    } = useNavbar();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: isMobile ? 1 : 0,
                    px: 2,
                    py: isMobile ? 1 : 0
                }}
            >
                <Typography variant="h6" sx={{mb: isMobile ? 1 : 0}}>
                    Hello {user?.name}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        gap: isMobile ? 1 : 2,
                        width: isMobile ? '100%' : 'auto'
                    }}
                >
                    <Button component={NavLink} to="/home" sx={linkStyle}>Home</Button>
                    {user?.role === 'ADMIN' && (
                        <>
                            <Button component={NavLink} to="/users" sx={linkStyle}>Users</Button>
                            <Button component={NavLink} to="/teams" sx={linkStyle}>Teams</Button>
                        </>
                    )}
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}