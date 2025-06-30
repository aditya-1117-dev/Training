import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/auth/AuthProvider.tsx";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {SnackbarProvider} from "./context/snackBar/SnackBarProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <DndProvider backend={HTML5Backend}>
            <AuthProvider>
                <SnackbarProvider>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </SnackbarProvider>
            </AuthProvider>
        </DndProvider>
    </StrictMode>
)
