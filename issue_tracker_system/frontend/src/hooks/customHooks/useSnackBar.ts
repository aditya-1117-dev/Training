import {useContext} from "react";
import {SnackbarContext} from "../../context/snackBar/SnackBarContext.tsx";

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};