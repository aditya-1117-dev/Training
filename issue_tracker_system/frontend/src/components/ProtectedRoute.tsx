import React from "react";
import {Role} from "../utils/constants.ts";
import {useAuth} from "../hooks/customHooks/useAuth.ts";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import Layout from "../pages/Layout.tsx";
import {Box, CircularProgress} from "@mui/material";

interface IPrivateRouteProps {
    allowedRoles: Role[];
}

export const ProtectedRoute: React.FC<IPrivateRouteProps> = ({allowedRoles}) => {
    const {
        token,
        user,
        loading
    } = useAuth();
    const navigate = useNavigate();

    if (loading) {
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

    if (!token || !user) {
        return <Navigate to="/" replace/>;
    }

    if (!allowedRoles.includes(user.role as Role)) {
        navigate(-1);
        return;
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};