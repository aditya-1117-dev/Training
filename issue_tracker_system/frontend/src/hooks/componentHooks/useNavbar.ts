import {useAuth} from "../customHooks/useAuth.ts";

export const useNavbar = () => {
    const { logout, user } = useAuth();

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
        marginRight: 1,
        '&.active': {
            fontWeight: 'bold',
            borderBottom: '1px solid white',
        },
    };

    return {
        user,
        logout,
        linkStyle,
    };
};