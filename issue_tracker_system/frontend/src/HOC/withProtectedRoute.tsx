import { type ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import UserNotAuthorized from "../pages/UserNotAuthorized.tsx";

export function withProtectedRoute<T extends {}>(
    WrappedComponent: ComponentType<T>,
    allowedRoles: string[]
) {
    return (props: T) => {
        const navigate = useNavigate();
        const { user, token } = useAuth();

        useEffect(() => {
            if (!token) {
                navigate('/login');
            }
        }, [token]);

        if (!token || !user) {
            console.log("User is not authenticated or token is missing.");
            return null;
        }

        if (!allowedRoles.includes(user.role)) {
            return <UserNotAuthorized />;
        }

        return <WrappedComponent {...props} />;
    };
}