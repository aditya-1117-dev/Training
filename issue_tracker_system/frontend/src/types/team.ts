export interface ITeam {
    id: string;
    name: string;
    description?: string;
    team_lead_id: string;
    team_lead_name: string;
    member_count: number;
    created_at: string;
    is_active?: boolean;
    updated_at?: string;
}

export interface ITeamUpdateData {
    name?: string;
    description?: string;
    team_lead_id?: string;
    is_active?: boolean;
}

export interface ITeamCreateData {
    name: string;
    description?: string;
    team_lead_id: string;
}