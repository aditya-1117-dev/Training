import React from 'react';
import { Box} from '@mui/material';
import Navbar from "../components/Navbar.tsx";

type ILayout = {
    children: React.ReactNode;
};

export default function Layout({children}: ILayout) {
    return (
        <Box>
            <Navbar />
            <Box sx={{mt: 2, px: 2}}>
                {children}
            </Box>
        </Box>
    );
}