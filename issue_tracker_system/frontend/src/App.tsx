import './App.css'
import { Route, Routes} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import {withProtectedRoute} from "./HOC/withProtectedRoute.tsx";

function App() {
    enum Role {
        ADMIN = 'ADMIN',
        TEAM_LEAD = 'TEAM_LEAD',
        MEMBER = 'MEMBER'
    }

    const allowedRoles: Record<string, Role[]> = {
        'home': [Role.ADMIN, Role.TEAM_LEAD, Role.MEMBER],
    }

    const ProtectedHome = withProtectedRoute<{}>(Home, allowedRoles.home);

    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={
                <ProtectedHome />
            } />
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    )
}

export default App;
