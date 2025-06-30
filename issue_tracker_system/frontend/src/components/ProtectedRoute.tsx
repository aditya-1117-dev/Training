import React, {type JSX} from "react";
import {Role} from "../utils/constants.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {Navigate} from "react-router-dom";
import Layout from "../pages/Layout.tsx";
import UserNotAuthorized from "../pages/UserNotAuthorized.tsx";
import {Box, CircularProgress} from "@mui/material";

interface PrivateRouteProps {
    element: JSX.Element;
    allowedRoles: Role[];
}

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({element, allowedRoles}) => {
    const {token, user, loading} = useAuth();

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
        return <UserNotAuthorized/>
    }

    return (
        <Layout>
            {element}
        </Layout>
    );
};