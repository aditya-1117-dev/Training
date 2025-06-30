import { Button, Stack, Typography, Box, Paper, Chip, IconButton } from '@mui/material';
import { Delete, Edit, PersonAdd } from '@mui/icons-material';
import type {IUser} from '../types/user.ts';
import { type IColumn, RenderTable } from '../components/table/RenderTable.tsx';
import { CreateUserDialog } from '../components/CreateUserDialog.tsx';
import { EditUserDialog } from '../components/EditUserDialog.tsx';
import {type FC, useEffect, useState} from "react";
import {RenderFilters} from "../components/table/RenderFilters.tsx";
import {useDebounce} from "../hooks/useDebounce.ts";
import {usePagination} from "../hooks/usePagination.ts";
import {useSnackbar} from "../hooks/useSnackBar.ts";
import {useAPI} from "../hooks/useAPI.ts";
import type {ITeam} from "../types/team.ts";

const Users : FC = () => {
    const [openCreateUserDialog, setOpenCreateUserDialog] = useState<boolean>(false);
    const [openEditUserDialog, setOpenEditUserDialog] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [teamFilter, setTeamFilter] = useState<string>('');
    const { value : searchTerm, setValue : setSearchTerm,debouncedValue: debouncedSearchTerm } = useDebounce<string>('', 500);
    const { page, limit, totalPages, handlePageChange, setTotalItems } = usePagination({
        initialPage: 1,
        initialLimit: 1,
    });
    const { addSnackbar } = useSnackbar();

    const { data: teams, execute: fetchTeams } = useAPI<ITeam[]>('/api/teams', {
        method: 'GET',
        callOnMount: false,
    });

    const { data: users, isLoading: usersLoading, execute: fetchUsers } = useAPI<IUser[]>('/api/users', {
        method: 'GET',
        callOnMount: false,
        params: {
            page: JSON.stringify(page),
            limit: JSON.stringify(limit),
            search: debouncedSearchTerm,
            team_id: teamFilter,
        },
        onSuccess: (data) => setTotalItems(data.pagination?.total || 0),
    });

    const { execute: handleDeleteUser } = useAPI<IUser>('/api/users/:id', {
        method: 'DELETE',
        onSuccess: () => {
            fetchUsers();
            addSnackbar({ severity: 'success', message: 'User deleted successfully' });
        },
        onError: (err: unknown) => {
            addSnackbar({ severity : 'error', message : err instanceof Error ? err.message : 'Delete operation failed',});
        },
    });

    useEffect(() => {
        fetchUsers();
    }, [page, limit, debouncedSearchTerm, teamFilter]);

    useEffect(() => {
        if (users?.length) fetchTeams();
    }, [users]);

    const handleEditUser = (user: IUser | null) => {
        setSelectedUser(user);
        setOpenEditUserDialog((openEditUserDialog) => !openEditUserDialog);
    };

    const renderRowNumber = (index: number = 0, page: number, limit: number) => {
        return (page - 1) * limit + index + 1;
    };

    const columns: IColumn<IUser>[] = [
        {key: 'row_number', label: 'ID', width: '5%',
            render: (_, index) => renderRowNumber(index, page, limit),
        },
        { key: 'name', label: 'Name', width: '10%' },
        { key: 'email', label: 'Email', width: '15%' },
        {key: 'role', label: 'Role', width: '15%', align : 'center',
            render: (user: IUser) => {
                const color = user.role === 'ADMIN' ? 'error' : user.role === 'TEAM_LEAD' ? 'primary' : 'success';
                return <Chip label={user.role} color={color} size="small" sx={{ py: 2 }} />;
            },
        },
        {key: 'team_name', label: 'Team', width: '15%',
            render: (user: IUser) => user.team_name || '-',
        },
        {key: 'actions', label: 'Actions', width: '15%', align: 'center',
            render: (user: IUser) => (
                <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton color="primary" onClick={() => handleEditUser(user)} aria-label={`Edit user ${user.name}`}>
                        <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteUser({ pathParams: { id: user.id } })}>
                        <Delete />
                    </IconButton>
                </Stack>
            ),
        },
    ];

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
                        onChange: (e) => setSearchTerm(e.target.value),}}
                    filters={[ {key: 'team', label: 'Team', value: teamFilter, onChange: (e) => setTeamFilter(e.target.value),
                            options: teams?.map((team) => ( { value: team.id, label: team.name } )) || [],} ]}
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