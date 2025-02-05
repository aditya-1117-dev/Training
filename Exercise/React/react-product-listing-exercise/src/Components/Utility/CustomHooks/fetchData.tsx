import { useState, useEffect } from "react";

const useFetch = (url : string, delay : number = 0 ) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect( () => {
        if (!url) {
            return;
        };
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setData(data);
            } catch (err : unknown) {
                if (err instanceof Error) {
                    setError(err?.message);
                } else {
                    console.error('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
        if (delay > 0) {
            const timer = setTimeout(() => fetchData(), delay);
            return () => clearTimeout(timer);
        } else {
            fetchData();
        }
    }, [url]);
    return { data, error, loading };
};

export default useFetch;
