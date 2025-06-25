export interface ITeam {
    id: string;
    name: string;
    description?: string;
    team_lead_id: string;
    team_lead_name: string;
    member_count: number;
    created_at: string;
}

export interface ITeamCreateData {
    name: string;
    description?: string;
    team_lead_id: string;
}