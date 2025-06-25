import {type ComponentType, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import UserNotAuthorized from "../pages/UserNotAuthorized.tsx";
import Layout from "../components/Layout.tsx";

export function withProtectedRoute<T extends {}>(
    WrappedComponent: ComponentType<T>,
    allowedRoles: string[]
) {
    return (props: T) => {
        const navigate = useNavigate();
        const {user, token} = useAuth();

        useEffect(() => {
            if (!token) {
                navigate('/');
            }
        }, [token]);

        if (!token || !user) {
            return null;
        }

        if (!allowedRoles.includes(user.role)) {
            return <UserNotAuthorized/>;
        }

        return (
            <Layout>
                <WrappedComponent {...props} />
            </Layout>
        );
    };
}