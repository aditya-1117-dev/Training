import type {IAPIResponse} from "../types/apiTypes.tsx";

export async function getRequest<T = any>(
    url: string,
    headers: Record<string, string> = {},
    options: RequestInit = {}
): Promise<IAPIResponse<T>> {
    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`GET request failed: ${response.statusText}`);
    }

    const data = await response.json() as IAPIResponse<T>;
    return data;
}

export async function postRequest<T = any, B = any>(
    url: string,
    body: B,
    headers: Record<string, string> = {},
    options: RequestInit = {}
): Promise<IAPIResponse<T>> {
    try {
        const response: Response = await fetch(url, {
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
        console.log(e)
        return {
            success: false,
            message: e instanceof Error ? e.message : 'An error occurred during the POST request',
            data: null as any
        };
    }
}

export async function putRequest<T = any, B = any>(
    url: string,
    body: B,
    headers: Record<string, string> = {},
    options: RequestInit = {}
): Promise<IAPIResponse<T>> {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(body),
        ...options,
    });

    if (!response.ok) {
        throw new Error(`PUT request failed: ${response.statusText}`);
    }

    const data = await response.json() as IAPIResponse<T>;
    return data;
}

export async function deleteRequest<T = any>(
    url: string,
    headers: Record<string, string> = {},
    options: RequestInit = {}
): Promise<IAPIResponse<T>> {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`DELETE request failed: ${response.statusText}`);
    }

    const data = await response.json() as IAPIResponse<T>;
    return data;
}