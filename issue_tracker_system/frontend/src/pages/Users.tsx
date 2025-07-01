import {Button, Stack, Typography, Box, Paper, Dialog, DialogContent, CircularProgress} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { RenderTable } from '../components/table/RenderTable.tsx';
import { CreateUserDialog } from '../components/CreateUserDialog.tsx';
import { EditUserDialog } from '../components/EditUserDialog.tsx';
import {type FC} from "react";
import {RenderFilters} from "../components/table/RenderFilters.tsx";
import {useUsers} from "../hooks/componentHooks/useUsers.tsx";

const Users : FC = () => {
    const {
        openCreateUserDialog,
        openEditUserDialog,
        selectedUser,
        teamFilter,
        searchTerm,
        users,
        usersLoading,
        teams,
        page,
        totalPages,
        columns,
        setSearchTerm,
        setOpenEditUserDialog,
        setSelectedUser,
        setTeamFilter,
        handlePageChange,
        fetchUsers,
        setOpenCreateUserDialog,
        userUpdating
    } = useUsers();

    if (userUpdating){
        return (
            <Dialog open={openEditUserDialog}>
                <DialogContent>
                    <CircularProgress/>
                </DialogContent>
            </Dialog>
        );
    }
    return (
        <Box sx={{ width: '100%', py: 4, px: { xs: 2, sm: 4, md: 6 }, boxSizing: 'border-box' }}>
            <Paper sx={{ p: 3, overflowX: 'auto' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} mb={3}>
                    <Typography variant="h5" component="h1">User Management</Typography>
                    <Button variant="contained" startIcon={<PersonAdd />} onClick={() => setOpenCreateUserDialog(true)}>
                        New User
                    </Button>
                </Stack>

                <RenderFilters
                    search={{value: searchTerm, label: 'Search Users',
                        onChange: (e) => setSearchTerm(e.target.value)}}
                    filters={[ {key: 'team', label: 'Team', value: teamFilter, onChange: (e) =>{
                            handlePageChange(1);
                            setTeamFilter(e.target.value)
                        }, options: teams?.map((team) => ( { value: team.id, label: team.name } )) || [],} ]}
                />

                <RenderTable
                    data={users || []}
                    columns={columns}
                    loading={usersLoading}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                <EditUserDialog
                    open={openEditUserDialog}
                    onClose={() => {
                        setOpenEditUserDialog(false);
                        setSelectedUser(null)
                    }}
                    onSubmit={() => {
                        setOpenEditUserDialog(false);
                        setSelectedUser(null);
                        fetchUsers();
                    }}
                    teams={teams || []}
                    user={selectedUser}
                />

                <CreateUserDialog
                    open={openCreateUserDialog}
                    onClose={() => setOpenCreateUserDialog(false)}
                    onSubmit={() => fetchUsers()}
                    teams={teams || []}
                />
            </Paper>
        </Box>
    );
}
export default Users;