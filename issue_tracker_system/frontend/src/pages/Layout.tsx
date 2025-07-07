import { Box} from '@mui/material';
import Navbar from "../components/Navbar.tsx";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <Box>
            <Navbar />
            <Box sx={{mt: 2, px: 2}}>
                <Outlet />
            </Box>
        </Box>
    );
}