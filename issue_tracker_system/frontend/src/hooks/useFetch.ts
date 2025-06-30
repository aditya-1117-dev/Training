import {useState, useEffect} from 'react';
import {getRequest} from '../utils/apiClient';
import type {IAPIResponse} from "../types/api";
import {useAuth} from "./useAuth.ts";

interface FetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    refetch?: () => void;
}

export function useFetch<T>(
    url: string,
    queryParams: Record<string, string> = {},
    callAtFirstRender: boolean = true,
    callBack?: (response: IAPIResponse<T>) => void,
    delay: number = 0
): FetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {token} = useAuth();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await getRequest<T>(url, {
                Authorization: `Bearer ${token}`,
            }, queryParams);

            if (!response.success) {
                throw new Error(response.message || `Failed to fetch data from ${url}`);
            }
            setData(response.data || null);
            if (callBack) {
                callBack(response);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!url || !callAtFirstRender) {
            callAtFirstRender = true;
            return;
        }

        if (delay > 0) {
            const timer = setTimeout(() => fetchData(), delay);
            return () => clearTimeout(timer);
        } else {
            fetchData();
        }
    }, [url, JSON.stringify(queryParams)]);

    return {data, isLoading, error, refetch: fetchData};
}