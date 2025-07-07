import type {IAPIResponse} from "../types/api.ts";
import {BASE_URL} from "./constants.ts";

export async function getRequest<T >(
    url: string,
    headers: Record<string, string> = {},
    queryParams: Record<string, string> = {},
    pathParams: Record<string, string> = {},
    options: RequestInit = {}
): Promise<IAPIResponse<T>> {
    try {
        const queryString = Object.keys(queryParams).length
            ? `?${new URLSearchParams(queryParams).toString()}`
            : '';

        for (const [key, value] of Object.entries(pathParams)) {
            url = url.replace(`:${key}`, encodeURIComponent(value));
        }
        
        const fullUrl = `${BASE_URL}${url}${queryString}`;

        const response: Response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            ...options,
        });

        const data = await response.json() as IAPIResponse<T>;

        if (!response.ok) {
            return data;
        }

        return data;
    } catch (e: unknown) {
        return {
            success: false,
            message: e instanceof Error ? e.message : 'An error occurred during the GET request',
        };
    }
}

export async function postRequest<T , B >(
    url: string,
    body: B,
    headers: Record<string, string> = {},
    pathParams: Record<string, string> = {},
    options: RequestInit = {}
): Promise<IAPIResponse<T>> {
    try {
        for (const [key, value] of Object.entries(pathParams)) {
            url = url.replace(`:${key}`, encodeURIComponent(value));
        }

        const response: Response = await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
            ...options,
        });

        const data = await response.json() as IAPIResponse<T>;

        if (!response.ok) {
            return data;
        }
        return data;
    } catch (e: unknown) {
        return {
            success: false,
            message: e instanceof Error ? e.message : 'An error occurred during the POST request',
        };
    }
}

export async function putRequest<T , B >(
    url: string,
    body: B,
    headers: Record<string, string> = {},
    pathParams: Record<string, string> = {},
    options: RequestInit = {}
): Promise<IAPIResponse<T>> {
    try {
        for (const [key, value] of Object.entries(pathParams)) {
            url = url.replace(`:${key}`, encodeURIComponent(value));
        }

        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
            ...options,
        });

        const data = await response.json() as IAPIResponse<T>;

        if (!response.ok) {
            return data;
        }

        return data;
    } catch (e: unknown) {
        return {
            success: false,
            message: e instanceof Error ? e.message : 'An error occurred during the PUT request',
        };
    }
}

export async function deleteRequest<T>(
    url: string,
    headers: Record<string, string> = {},
    pathParams: Record<string, string> = {},
    options: RequestInit = {}
): Promise<IAPIResponse<T>> {
    try {
        for (const [key, value] of Object.entries(pathParams)) {
            url = url.replace(`:${key}`, encodeURIComponent(value));
        }

        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            ...options,
        });

        const data = await response.json() as IAPIResponse<T>;

        if (!response.ok) {
            return data
        }
        
        return data;
    } catch (e:  unknown) {
        return {
            success: false,
            message: e instanceof Error ? e.message : 'An error occurred during the DELETE request'
        };
    }
}