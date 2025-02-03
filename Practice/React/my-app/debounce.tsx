import {useEffect, useState} from "react";

export default function useDebounce(search : string, delay: number = 1000) {
    // const [debounceValue, setDebounceValue] = useState(search);
    useEffect(() => {
        const timeout = setTimeout(()=>{
            // setDebounceValue(search);
            return search;
        }, delay);
        return () => clearTimeout(timeout);
    }, [search, delay]);

    // return debounceValue;
    return;
}