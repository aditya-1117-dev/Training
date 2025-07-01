import {Box, Button, Typography, Stack, Paper, Dialog, DialogContent, CircularProgress} from '@mui/material';
import { GroupAdd} from '@mui/icons-material';
import { RenderTable} from '../components/table/RenderTable.tsx';
import {CreateTeamDialog} from '../components/CreateTeamDialog.tsx';
import {type FC} from "react";
import {EditTeamDialog} from "../components/EditTeamDialog.tsx";
import {useTeams} from "../hooks/componentHooks/useTeams.tsx";

const Teams: FC = () => {
    const {
        openEditTeamDialog,
        selectedTeam,
        openCreateTeamsDialog,
        teams,
        teamsLoading,
        soloMembers,
        soloMembersWithinCurrentTeam,
        columns,
        setOpenCreateTeamsDialog,
        setOpenEditTeamDialog,
        setSelectedTeam,
        fetchTeams,
        fetchUsers,
        updatingTeam
    } = useTeams();

    if (updatingTeam){
        return (
            <Dialog open={openEditTeamDialog}>
                <DialogContent>
                    <CircularProgress/>
                </DialogContent>
            </Dialog>
        );
    }

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