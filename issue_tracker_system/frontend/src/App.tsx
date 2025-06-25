import './App.css'
import {Route, Routes} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import {withProtectedRoute} from "./HOC/withProtectedRoute.tsx";
import Users from "./pages/Users.tsx";
import Teams from "./pages/Teams.tsx";

function App() {
    enum Role {
        ADMIN = 'ADMIN',
        TEAM_LEAD = 'TEAM_LEAD',
        MEMBER = 'MEMBER'
    }

    const allowedRoles: Record<string, Role[]> = {
        'home': [Role.TEAM_LEAD, Role.MEMBER],
        'users': [Role.ADMIN],
        'teams': [Role.ADMIN],
    }

    const ProtectedHome = withProtectedRoute<{}>(Home, allowedRoles.home);
    const ProtectedUsers = withProtectedRoute<{}>(Users, allowedRoles.users);
    const ProtectedTeams = withProtectedRoute<{}>(Teams, allowedRoles.teams);

    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/users" element={<ProtectedUsers/>}/>
            <Route path="/teams" element={<ProtectedTeams/>}/>
            <Route path="/home" element={<ProtectedHome/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    )
}

export default App;
