import {workflowStatesValues} from "./constants.ts";
import type {TTaskStatus} from "../types/task.ts";

export interface IValidationConfig {
    oldStatus: TTaskStatus;
    newStatus: TTaskStatus;
    userRole?: string;
}

export interface IValidationRule {
    condition: boolean;
    message?: string;
    silent?: boolean;
}

export const createValidationRules = ({ oldStatus, newStatus, userRole} : IValidationConfig): IValidationRule[] => [
    {
        condition: oldStatus === newStatus,
        silent: true
    },
    {
        condition: oldStatus === 'DONE' && newStatus !== 'IN_PROGRESS' &&
            Math.abs(workflowStatesValues[newStatus] - workflowStatesValues[oldStatus]) > 1,
        message: 'Tasks can only be moved to adjacent statuses.'
    },
    {
        condition: oldStatus === 'DONE' && newStatus === 'IN_REVIEW',
        message: 'Tasks cannot be moved from DONE to IN_REVIEW.'
    },
    {
        condition: userRole === 'MEMBER' && workflowStatesValues[newStatus] < workflowStatesValues[oldStatus],
        message: 'Members cannot move tasks backward.'
    },
    {
        condition: userRole === 'MEMBER' && newStatus === 'DONE',
        message: 'Members cannot move tasks to DONE status.'
    }
];