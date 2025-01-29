import { useState, useEffect } from "react";

const useFetch = (url : string, updateLoadingStatus: (status:boolean)=> void) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect( () => {
        const fetchData = async () => {
            try {
                updateLoadingStatus(true);
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
                updateLoadingStatus(false);
            }
        };
        fetchData();
    }, [url]);
    return { data, error };
};

export default useFetch;
