import {Button} from "reactstrap";

export default function LogOut() {
    function logOut() {
        localStorage.removeItem("role");
        localStorage.removeItem("accessToken");
        location.href="/login";
    }
    return <Button onClick={logOut} > Logout</Button>
}