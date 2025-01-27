import {useEffect, useState} from "react";

export default function useDebounce(search : string, delay: number = 1000) {
    const [debounceValue, setDebounceValue] = useState(search);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(()=>{
            setDebounceValue(search);
            setLoading(false);
        }, delay);

        return () => clearTimeout(timeout);
    }, [search, delay]);

    return {debounceValue, loading};
}