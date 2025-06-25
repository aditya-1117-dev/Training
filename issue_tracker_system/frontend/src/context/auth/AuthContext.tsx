import { createContext } from 'react';
import type {IUser} from "../../types/userTypes";

export interface IAuthContext {
    user: IUser | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void | string>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);
