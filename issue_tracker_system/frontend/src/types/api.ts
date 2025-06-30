export interface IError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

export interface IAPIResponse<T> {
    success: boolean;
    data?: T;
    error?: IError;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}