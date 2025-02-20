import UserNotAuthorized from "./UserNotAuthorized.tsx";
import {useNavigate} from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }: { children? : any ; allowedRoles: string[] }) {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    if (!token && !role){
        navigate('/login');
        return ;
    }
    if (!token || !allowedRoles.includes(role as string ) ) {
        return <UserNotAuthorized /> ;
    }
    return children;
}
export default ProtectedRoute;