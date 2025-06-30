import {postRequest, putRequest, deleteRequest, getRequest} from '../utils/apiClient';
import type {IAPIResponse} from "../types/api";
import React, {useEffect, useState} from "react";
import {useAuth} from "./useAuth.ts";

type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' ;

interface IAPIHookOptions<T> {
    method?: THttpMethod;
    callOnMount?: boolean;
    delay?: number;
    onSuccess?: (response: IAPIResponse<T>, context?: any ) => void;
    onError?: (error: unknown) => void;
    params? : Record<string, string>
}

interface IAPIHookResult<T, B> {
    data: T | null;
    setData :  React.Dispatch<React.SetStateAction<T | null>>;
    isLoading: boolean;
    error: string | null;
    execute: (args?: { body?: B; pathParams?: Record<string, string>, context?: any; }) => Promise<void>;
}

export function useAPI<T, B = undefined>(
    url: string,
    options: IAPIHookOptions<T> = {}
): IAPIHookResult<T, B> {
    const {
        method = 'GET',
        callOnMount = (method === 'GET'),
        delay = 0,
        onSuccess,
        onError,
        params
    } = options;

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const executeRequest = async ( args? : {
        body?: B,
        pathParams? : Record<string, string>,
        context?: any;
    }) => {
        try {
            const { body = {}, pathParams = {}, context } = args || {};
            setIsLoading(true);
            setError(null);

            let response: IAPIResponse<T>;

            switch (method) {
                case 'POST':
                    response = await postRequest<T, B>(url, body as B, {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }, pathParams);
                    break;
                case 'PUT':
                    response = await putRequest<T>(url, body, {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }, pathParams);
                    break;
                case 'DELETE':
                    response = await deleteRequest<T>(url, {
                        Authorization: `Bearer ${token}`
                    }, pathParams);
                    break;
                default:
                    response = await getRequest<T>(url, {
                        Authorization: `Bearer ${token}`
                    }, params, pathParams);
            }
            if (!response.success) {
                throw new Error(response.error?.message || `Request failed with status`);
            }else {
                setData(response.data || null);
                if (onSuccess) onSuccess(response, context);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(message);
            if (onError) {
                onError(err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!callOnMount || !url) return;

        if (delay > 0) {
            const timer = setTimeout(() => executeRequest(), delay);
            return () => clearTimeout(timer);
        } else {
            executeRequest();
        }
    }, [url, JSON.stringify(params)]);

    return {
        data,
        setData,
        isLoading,
        error,
        execute: executeRequest,
    };
}