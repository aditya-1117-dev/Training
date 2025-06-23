import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import UserNotAuthorized from "../pages/UserNotAuthorized.tsx";
import {useAuth} from "../hooks/useAuth.tsx";

function ProtectedRoute({ allowedRoles, children }: { children? : any ; allowedRoles: string[] }) {
    const {user, token} = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !user?.role){
            navigate('/login');
            return ;
        }
    }, [token]);
    if (token && allowedRoles.includes(user?.role as string) ) {
        return children;
    }else if (token && !allowedRoles.includes(user?.role as string)){
        return <UserNotAuthorized /> ;
    }else{
        return null;
    }
}

function ProtectedRouteWrapper({allowedRoles, component} : {allowedRoles : string[], component : any}) {
    return (
        <ProtectedRoute allowedRoles={allowedRoles}>
            {component}
        </ProtectedRoute>
    )
}
export default ProtectedRouteWrapper;