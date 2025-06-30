import type {TTaskStatus} from "../types/task";

export const BASE_URL = 'http://localhost:3000';

export enum Role {
    ADMIN = 'ADMIN',
    TEAM_LEAD = 'TEAM_LEAD',
    MEMBER = 'MEMBER'
}

export const allowedRoles: Record<string, Role[]> = {
    'home': [Role.ADMIN, Role.TEAM_LEAD, Role.MEMBER],
    'users': [Role.ADMIN],
    'teams': [Role.ADMIN],
}

export const workflowStatesValues: Record<TTaskStatus, number> = {
    TODO: 1,
    IN_PROGRESS: 2,
    IN_REVIEW: 3,
    DONE: 4
}