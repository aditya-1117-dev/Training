export interface IError {
    code : string;
    message : string;
}

export interface IAPIResponse<T> {
    success : boolean;
    data? : T;
    error? : IError;
    message? : string;
    "pagination"?: {
        "page": number,
        "limit": number,
        "total": number,
        "totalPages": number
    }
}