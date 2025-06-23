import { createContext } from 'react';
import type {ILoginResponse} from "../../types/apiTypes.tsx";

export interface IAuthContext {
    user: ILoginResponse | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);
