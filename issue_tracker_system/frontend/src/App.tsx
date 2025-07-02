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
            <Route element={<ProtectedRoute allowedRoles={allowedRoles.users} />}>
                <Route path="/users" element={<Users />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={allowedRoles.teams} />}>
                <Route path="/teams" element={<Teams />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={allowedRoles.home} />}>
                <Route path="/home" element={<KanbanBoard />} />
            </Route>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    )
}

export default App;