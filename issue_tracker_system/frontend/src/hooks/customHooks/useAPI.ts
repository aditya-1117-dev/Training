import {postRequest, putRequest, deleteRequest, getRequest} from '../../utils/apiClient.ts';
import type {IAPIResponse} from "../../types/api.ts";
import React, {useCallback, useEffect, useState} from "react";
import {useAuth} from "./useAuth.ts";

type THttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' ;

interface IExecuteFunction<B> {
    body?: B,
    pathParams?: Record<string, string>,
    context?: unknown;
}
interface IAPIHookOptions<T> {
    method?: THttpMethod;
    callOnMount?: boolean;
    delay?: number;
    onSuccess?: (response: IAPIResponse<T>, context?: unknown ) => void;
    onError?: (error: unknown) => void;
    params? : Record<string, string>
}

interface IAPIHookResult<T, B> {
    data: T | null;
    setData :  React.Dispatch<React.SetStateAction<T | null>>;
    isLoading: boolean;
    error: string | null;
    execute: (args?: IExecuteFunction<B>) => Promise<void>;
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

    const executeRequest = useCallback(async (args?: IExecuteFunction<B>) => {
        try {
            const { body = {}, pathParams = {}, context } = args || {};
            setIsLoading(true);
            setError(null);

            let response: IAPIResponse<T>;
            const headers = { Authorization: `Bearer ${token}`, ...(method !== 'GET' && { 'Content-Type': 'application/json' }) };

            switch (method) {
                case 'POST':
                    response = await postRequest<T, B>(url, body as B, headers, pathParams);
                    break;
                case 'PUT':
                    response = await putRequest<T, B>(url, body as B, headers, pathParams);
                    break;
                case 'DELETE':
                    response = await deleteRequest<T>(url, headers, pathParams);
                    break;
                default:
                    response = await getRequest<T>(url, headers, params, pathParams);
            }
            if (!response.success) {
                const errorMessage = response.error?.message || 'Request failed';
                setError(errorMessage);
                if (onError) onError(new Error(errorMessage));
            } else {
                setData(response.data || null);
                if (onSuccess) onSuccess(response, context);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(message);
            if (onError) onError(err);
        } finally {
            setIsLoading(false);
        }
    }, [method, url, token, onSuccess, onError, JSON.stringify(params)]);

    useEffect(() => {
        if (!callOnMount || !url) return;

        if (delay > 0) {
            const timer = setTimeout(() => executeRequest(), delay);
            return () => clearTimeout(timer);
        } else {
            executeRequest();
        }
    }, [ executeRequest , callOnMount, delay ]);

    return {
        data,
        setData,
        isLoading,
        error,
        execute: executeRequest,
    };
}