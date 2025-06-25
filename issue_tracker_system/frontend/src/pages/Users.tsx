import {useState, useEffect, type ReactNode} from 'react';
import {Button, Stack, Alert, Typography, Box, Paper, Snackbar} from '@mui/material';
import {PersonAdd} from '@mui/icons-material';
import type {IUser, IUserCreateData} from "../types/userTypes.tsx";
import {RenderTable} from "../components/RenderTable.tsx";
import {CreateUserDialog} from "../components/CreateUserDialog.tsx";
import {getRequest, postRequest} from "../utils/apiClient.tsx";
import {useAuth} from "../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import type {ITeam} from "../types/teamTypes.tsx";

export default function Users() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [openCreateUserDialog, setOpenCreateUserDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [limit, _setLimit] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(1);
    const {token} = useAuth();
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'error',
    });

    const columns: {
        key: string; header: string; render?: (item: any) => ReactNode;
        align?: 'left' | 'center' | 'right'; width?: string | number;
    }[] = [
        {key: 'name', header: 'Name', width: '25%'},
        {key: 'email', header: 'Email', width: '25%'},
        {key: 'role', header: 'Role', width: '15%'},
        {key: 'team_name', header: 'Team', width: '15%', render: (user: IUser) => user.team_name || '-'}
    ];

    useEffect(() => {
        fetchUsers();
    }, [page, limit]);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getRequest<
                IUser[]
            >(`http://localhost:3000/api/users?page=${page}&limit=${limit}`, {
                Authorization: `Bearer ${token}`,
            });
            if (!response.success) {
                throw new Error('Create failed');
            }
            if (response.data) {
                setUsers(response.data);
            }
            if (response.pagination) {
                setTotalPages(response.pagination.totalPages);
            }
        } catch (err: unknown) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to load users',
                severity: 'error'
            });

        } finally {
            setLoading(false);
        }
    };

    const fetchTeams = async () => {
        try {
            const response = await getRequest<ITeam[]>('http://localhost:3000/api/teams', {
                Authorization: `Bearer ${token}`
            });
            if (response.data) setTeams(response.data);
        } catch (err: unknown) {
            setTeams([]);
        }
    };

    const handleCreate = async (data: IUserCreateData) => {
        try {
            const response = await postRequest<{
                token: string,
                user: IUser
            }, IUserCreateData>('http://localhost:3000/api/users', data, {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            });
            setSnackbar({
                open: true,
                message: 'User created successfully!',
                severity: 'success'
            });
            if (response.error) throw new Error(response.error.message || 'Create failed');
            setPage(1);
            await fetchUsers();
        } catch (err: unknown) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Create operation failed',
                severity: 'error'
            });
        }
    }

    return (
        <Box sx={{width: '100%', py: 4, px: {xs: 2, sm: 4, md: 6}, boxSizing: 'border-box'}}>
            <Paper sx={{p: 3, overflowX: 'auto'}}>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    justifyContent="space-between"
                    alignItems='center'
                    spacing={2}
                    mb={3}
                >
                    <Typography variant="h5" component="h1">User Management</Typography>

                    <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap: 1}}>
                        <Button variant="outlined" sx={{mr: 1}} onClick={() => navigate('/teams')}>
                            Click here to move to Teams
                        </Button>
                        <Button variant="contained" startIcon={<PersonAdd/>}
                                onClick={() => setOpenCreateUserDialog(true)}>
                            New User
                        </Button>
                    </Box>
                </Stack>

                <RenderTable
                    data={users}
                    columns={columns}
                    loading={loading}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

                <CreateUserDialog
                    open={openCreateUserDialog}
                    onClose={() => setOpenCreateUserDialog(false)}
                    onSubmit={handleCreate}
                    teams={teams}
                />
            </Paper>
        </Box>
    );
}