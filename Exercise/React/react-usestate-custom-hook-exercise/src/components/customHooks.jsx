import {useCallback, useReducer} from "react";

function reducer(state, action) {
    switch (action.type) {
        case "SET" : {
            return {
                ...state,
                [action.key] : action.value
            }
        }
        default : throw Error("Wrong Action : ", action.type );
    }
}

export function useCustomStates(initialValue){
    const [state, dispatch] = useReducer( reducer, initialValue || {});

    const get = useCallback((key) => {
        console.log("getter called : ", key);
        return state[key];
    }, [state]);

    const set = useCallback( (key, value) => {
        console.log("setter called :",key);
        dispatch({type: "SET", key:key, value});
    }, [state]);

    return [get, set];
}
