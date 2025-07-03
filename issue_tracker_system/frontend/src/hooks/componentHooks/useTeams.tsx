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

    const columns: IColumn<ITeam>[] = [
        {key: 'row_number', label: 'ID', width: '5%', render: (_, index) => renderRowNumber(index)},
        {key: 'name', label: 'Name', width : '15%'},
        {key: 'description', label: 'Description', width : '25%',
            render: (team: ITeam) => {
                const maxLength = 40;
                const description = team.description || '';
                const shortened = description.length > maxLength
                    ? description.slice(0, maxLength) + '...'
                    : description;

                return (
                    <Tooltip title={description}>
                        <span>{shortened}</span>
                    </Tooltip>
                );
            }
        },
        {key: 'team_lead_name', label: 'Team Lead', width : '15%'},
        {key: 'member_count', label: 'Members', align: 'center', width : '10%'},
        {
            key: 'is_active', label: 'Status', width: '15%',
            render: (team: ITeam) => {
                return team.is_active ? (
                    <Chip label="Active" size="small"
                          sx={{py: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)', color: 'rgba(76, 175, 80, 1)'}}/>
                ) : (
                    <Chip label="Inactive" size="small"
                          sx={{py: 2, backgroundColor: 'rgba(244, 67, 54, 0.1)', color: 'rgba(244, 67, 54, 1)'}}/>
                );
            }
        },
        {
            key: 'actions', label: 'Actions', width: '15%', align: 'center',
            render: (team: ITeam) => (
                <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton color="primary" onClick={() => handleEditTeam(team)}
                                disabled={!team.is_active} aria-label={`Edit user ${team.name}`}>
                        <Edit/>
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteTeam(team)} disabled={!team.is_active}>
                        <Delete/>
                    </IconButton>
                </Stack>
            ),
        },
    ];

    return {
        teams,
        columns,
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
        teamUpdateLoading
    };
};