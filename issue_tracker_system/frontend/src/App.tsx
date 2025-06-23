import './App.css'
import { Route, Routes} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import ProtectedRouteWrapper from "./components/ProtectedRoute.tsx";

function App() {
    enum Role {
        ADMIN = 'ADMIN',
        TEAM_LEAD = 'TEAM_LEAD',
        MEMBER = 'MEMBER'
    }

    const allowedRoles: Record<string, Role[]> = {
        'home': [Role.ADMIN, Role.TEAM_LEAD, Role.MEMBER],
    }

    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={
                <ProtectedRouteWrapper
                    allowedRoles={allowedRoles.home}
                    component={<Home/>}
                />
            } />
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    )
}

export default App;
