import {useContext} from "react";
import {AuthContext, type IAuthContext} from "../../context/auth/AuthContext.tsx";

export const useAuth = () : IAuthContext => {
    const context = useContext<IAuthContext | null>(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};