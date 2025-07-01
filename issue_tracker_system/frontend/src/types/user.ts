export interface IUser {
    "id": string,
    "email": string,
    "name": string,
    "role": 'ADMIN' | 'TEAM_LEAD' | 'MEMBER',
    "is_active": boolean,
    "team_id"?: string,
    "team_name"?: string,
}

export interface IUserCreateData {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'TEAM_LEAD' | 'MEMBER';
    team_id?: string;
}

export interface IUserUpdateData {
    name?: string;
    email?: string;
    password?: string;
    role?: 'ADMIN' | 'TEAM_LEAD' | 'MEMBER';
    team_id?: string;
    team_name?: string,
    is_active? : boolean
}