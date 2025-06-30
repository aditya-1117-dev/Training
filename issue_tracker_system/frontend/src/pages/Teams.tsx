import {Box, Button, Typography, Stack, Paper, IconButton} from '@mui/material';
import {Delete, Edit, GroupAdd} from '@mui/icons-material';
import {type IColumn, RenderTable} from '../components/table/RenderTable.tsx';
import {CreateTeamDialog} from '../components/CreateTeamDialog.tsx';
import type {ITeam, ITeamCreateData, ITeamUpdateData} from '../types/team.ts';
import {type FC, useState} from "react";
import {EditTeamDialog} from "../components/EditTeamDialog.tsx";
import {useSnackbar} from "../hooks/useSnackBar.ts";
import type {IUser, IUserUpdateData} from "../types/user.ts";
import {useAPI} from "../hooks/useAPI.ts";

const Teams: FC = () => {
    const {addSnackbar} = useSnackbar();
    const [openEditTeamDialog, setOpenEditTeamDialog] = useState<boolean>(false);
    const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
    const [openCreateTeamsDialog, setOpenCreateTeamsDialog] = useState(false);
    const {data: teams, isLoading: teamsLoading, execute: fetchTeams} = useAPI<ITeam[]>('/api/teams', {method: "GET"})
    const {data: users, execute: fetchUsers} = useAPI<IUser[]>('/api/users', {method: "GET"})

    const {execute: handleDeleteTeam} = useAPI<IUser>('/api/teams/:id', {
        method: 'DELETE',
        onSuccess: () => {
            if (fetchTeams) {
                fetchTeams();
            }
            addSnackbar( { severity : 'success', message : 'User deleted successfully!'})
        },
        onError: (err: unknown) => {
            addSnackbar( { severity : 'error', message : err instanceof Error ? err.message : 'Delete operation failed'})
        }
    });

    const handleEditTeam = (team: ITeam | null) => {
        setSelectedTeam(team);
        setOpenEditTeamDialog(openEditTeamDialog => !openEditTeamDialog);
    };

    const soloMembers = users?.filter((user: IUser) => user.role === 'MEMBER' && user.team_id == null) || [];

    const soloMembersWithinCurrentTeam = [...soloMembers, ...(selectedTeam ? users?.filter((user: IUser) => user.team_id === selectedTeam.id) || [] : [])];

    const renderRowNumber = (index: number = 0) => index + 1;

    const columns: IColumn<ITeam>[] = [
        {key: 'row_number', label: 'ID', width: '5%', render: (_, index) => renderRowNumber(index)},
        {key: 'name', label: 'Name'},
        {key: 'description', label: 'Description'},
        {key: 'team_lead_name', label: 'Team Lead'},
        {key: 'member_count', label: 'Members', align: 'center'},
        {key: 'created_at', label: 'Created At', render: team => new Date(team.created_at).toLocaleString()},
        {
            key: 'actions', label: 'Actions', width: '15%', align: 'center',
            render: (team: ITeam) => (
                <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton color="primary" onClick={() => handleEditTeam(team)}
                                aria-label={`Edit user ${team.name}`}>
                        <Edit/>
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteTeam({pathParams: {id: team.id}})}>
                        <Delete/>
                    </IconButton>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{width: '100%', py: 4, px: {xs: 2, sm: 4, md: 6}, boxSizing: 'border-box'}}>
            <Paper sx={{p: 3, overflowX: 'auto'}}>
                <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5">Team Management</Typography>
                    <Button variant="contained" startIcon={<GroupAdd/>} onClick={() => setOpenCreateTeamsDialog(true)}>
                        New Team
                    </Button>
                </Stack>

                <RenderTable data={teams || []} columns={columns} loading={teamsLoading}/>

                <EditTeamDialog
                    open={openEditTeamDialog}
                    team={selectedTeam}
                    users={soloMembersWithinCurrentTeam}
                    onClose={() => {
                        setOpenEditTeamDialog(false)
                        setSelectedTeam(null);
                    }}
                    onSubmit={() => {
                        setOpenEditTeamDialog(false);
                        setSelectedTeam(null);
                        if (fetchTeams) {
                            fetchTeams();
                        }
                    }}
                />

                <CreateTeamDialog
                    open={openCreateTeamsDialog}
                    users={soloMembers}
                    onClose={() => setOpenCreateTeamsDialog(false)}
                    onSubmit={() => {
                        if (fetchTeams) fetchTeams();
                        if (fetchUsers) fetchUsers();
                    }}
                />
            </Paper>
        </Box>
    );
}
export default Teams;