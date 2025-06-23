
export interface IError {
    code : string;
    message : string;
}

export interface ILoginResponse {
    "id": string,
    "email": string,
    "name": string,
    "role": string,
    "is_active": boolean
}

export interface IAPIResponse<T> {
    success : boolean;
    data? : T;
    error? : IError;
    message? : string;
}