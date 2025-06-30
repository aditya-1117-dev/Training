export type TPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TTaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';

export interface ITask {
    assignee_name?: string;
    id?: string;
    title: string;
    description: string;
    status?: TTaskStatus;
    priority: TPriority;
    team_id: string;
    assignee_id?: string;
    estimated_hours?: number;
    actual_hours?: number;
    due_date?: string;
    created_at?: string;
    updated_at?: string;
    comments?: IComment[];
    history?: IHistory[];
}

export interface IComment {
    is_edited: boolean;
    user_name: string;
    id: string;
    task_id: string;
    user_id: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface IHistory {
    user_name: string;
    id: string;
    task_id: string;
    user_id: string;
    action: string;
    details: string;
    created_at: string;
    field_changed : string;
    old_value : string;
    new_value : string;
}