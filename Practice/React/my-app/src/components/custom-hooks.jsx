import {useCallback, useEffect, useState} from "react";

export default function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        function handleOnline() {
            setIsOnline(true);
        }
        function handleOffline() {
            setIsOnline(false);
        }
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    return isOnline;
}


export function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    };
}


export function useCustomStates(initialValue){
    const [state, setState] = useState(initialValue || {});

    const get = useCallback((key) => {
        console.log("getter called : ", key);
        return state[key];
    }, [state]);

    const set = useCallback( (key, value) => {
        const newState = {...state, [key]:value}
        console.log("setter called :",key);
        setState(newState);
    }, [state]);

    return [get, set];
}

