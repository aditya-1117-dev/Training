import {useState} from 'react';
import {Stack, IconButton, Chip, Tooltip} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';
import type {ITeam, ITeamUpdateData} from '../../types/team.ts';
import type {IUser} from '../../types/user.ts';
import type {IColumn} from '../../components/table/RenderTable.tsx';
import {useAPI} from "../customHooks/useAPI.ts";
import {useSnackbar} from "../customHooks/useSnackBar.ts";

export const useTeams = () => {
    const {addSnackbar} = useSnackbar();
    const [openEditTeamDialog, setOpenEditTeamDialog] = useState<boolean>(false);
    const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
    const [openCreateTeamsDialog, setOpenCreateTeamsDialog] = useState(false);
    const {data: teams, isLoading: teamsLoading, execute: fetchTeams} = useAPI<ITeam[]>('/api/teams', {method: "GET"})
    const {data: users, execute: fetchUsers} = useAPI<IUser[]>('/api/users', {
        method: "GET",
        params: {
            limit: '100'
        }
    })

    const {execute: updateTeam, isLoading: teamUpdateLoading} = useAPI<ITeam, ITeamUpdateData>('/api/teams/:id', {
        method: 'PUT',
        callOnMount: false,
        onSuccess: () => {
            addSnackbar({severity: 'success', message: 'Team deleted successfully!'});
        },
        onError: (err: unknown) => {
            addSnackbar({severity: 'error', message: err instanceof Error ? err.message : 'Failed to delete team'});
        },
    });

    const handleEditTeam = (team: ITeam | null) => {
        setSelectedTeam(team);
        setOpenEditTeamDialog(openEditTeamDialog => !openEditTeamDialog);
    };

    const activeSoloMembers = users?.filter((user: IUser) => user.role === 'MEMBER' && user.team_id == null && user.is_active) || [];

    const soloMembersWithinCurrentTeam = [...activeSoloMembers, ...(selectedTeam ? users?.filter((user: IUser) => user.team_id === selectedTeam.id) || [] : [])];

    const renderRowNumber = (index: number = 0) => index + 1;

    const handleDeleteTeam = async (team: ITeam) => {
        await updateTeam({pathParams: {id: team.id}, body: {...team, is_active: false}});
        fetchTeams();
    }

    const handleCloseEditTeamDialog = () => {
        setOpenEditTeamDialog(false)
        setSelectedTeam(null);
    }

    const handleUpdateTeam = () => {
        setOpenEditTeamDialog(false);
        setSelectedTeam(null);
        if (fetchTeams) {
            fetchTeams();
        }
    }

    const handleCloseCreateTeamDialog = () => setOpenCreateTeamsDialog(false)
    
    const handleCreateNewTeam = () => {
        if (fetchTeams) fetchTeams();
        if (fetchUsers) fetchUsers();
    }

    return {
        teams,
        selectedTeam,
        teamsLoading,
        openEditTeamDialog,
        openCreateTeamsDialog,
        soloMembersWithinCurrentTeam,
        setOpenCreateTeamsDialog,
        handleCloseEditTeamDialog,
        handleCloseCreateTeamDialog,
        handleUpdateTeam,
        handleCreateNewTeam,
        teamUpdateLoading,
        handleEditTeam,
        handleDeleteTeam,
        renderRowNumber
    };
};