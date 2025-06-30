import {createContext} from "react";

export type TSnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface IAddSnackbarArgs {
    message: string;
    severity: TSnackbarSeverity;
}

interface ISnackbarContextType {
    addSnackbar: ( args : IAddSnackbarArgs) => void;
}

export const SnackbarContext = createContext<ISnackbarContextType | undefined>(undefined);
