export interface IUser {
    "id": string,
    "email": string,
    "name": string,
    "role": 'ADMIN' | 'TEAM_LEAD' | 'MEMBER',
    "is_active": boolean
}

export interface IUserWithTeam extends IUser {
    "team_id": string,
    "team_name": string,
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
    role?: 'ADMIN' | 'TEAM_LEAD' | 'MEMBER';
    team_id?: string | null;
}