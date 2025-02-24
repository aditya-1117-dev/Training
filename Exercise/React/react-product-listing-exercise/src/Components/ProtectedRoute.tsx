import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import UserNotAuthorized from "./UserNotAuthorized.tsx";

function ProtectedRoute({ allowedRoles, children }: { children? : any ; allowedRoles: string[] }) {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !role){
            navigate('/login');
            return ;
        }
    }, []);
    if (token && allowedRoles.includes(role as string) ) {
        return children;
    }else if (token && !allowedRoles.includes(role as string)){
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