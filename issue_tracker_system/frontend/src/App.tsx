import './App.css'
import {Route, Routes} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.tsx";
import Login from "./pages/Login.tsx";
import Users from "./pages/Users.tsx";
import Teams from "./pages/Teams.tsx";
import {allowedRoles} from "./utils/constants.ts";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import KanbanBoard from "./pages/KanbanBoard.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route
                path="/users"
                element={<ProtectedRoute element={<Users/>} allowedRoles={allowedRoles.users}/>}
            />
            <Route
                path="/teams"
                element={<ProtectedRoute element={<Teams/>} allowedRoles={allowedRoles.teams}/>}
            />
            <Route
                path="/home"
                element={<ProtectedRoute element={<KanbanBoard/>} allowedRoles={allowedRoles.home}/>}
            />
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    )
}

export default App;