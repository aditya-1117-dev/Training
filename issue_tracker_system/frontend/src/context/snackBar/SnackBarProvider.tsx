import React, {useRef, useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {type IAddSnackbarArgs, SnackbarContext} from "./SnackBarContext";

interface SnackbarProviderProps {
    children: React.ReactNode;
}

interface ISnackbarMessage {
    id: number;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const counter = useRef(0);
    const [snackbars, setSnackbars] = useState<ISnackbarMessage[]>([]);

    const addSnackbar = ({ message, severity} : IAddSnackbarArgs ) => {
        const id = ++counter.current;
        setSnackbars((prev) => [...prev, { id, message, severity }]);
    };

    const handleClose = (id: number) => {
        setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
    };

    return (
        <SnackbarContext.Provider value={{ addSnackbar }}>
            {children}
            {snackbars.map((snackbar : ISnackbarMessage) => (
                <Snackbar
                    key={snackbar.id}
                    open={true}
                    autoHideDuration={4000}
                    onClose={() => handleClose(snackbar.id)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    sx={{ mb: snackbars.length > 1 ? `${snackbars.indexOf(snackbar) * 60}px` : 0 }}
                >
                    <Alert
                        onClose={() => handleClose(snackbar.id)}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            ))}
        </SnackbarContext.Provider>
    );
};
