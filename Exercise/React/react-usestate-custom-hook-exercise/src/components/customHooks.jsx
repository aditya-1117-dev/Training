import {useCallback, useState} from "react";

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
