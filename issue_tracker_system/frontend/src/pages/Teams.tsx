import {useState, useEffect, type ReactNode} from 'react';
import {Box, Button, Typography, Alert, Stack, Paper, Snackbar} from '@mui/material';
import {GroupAdd} from '@mui/icons-material';
import {getRequest, postRequest} from "../utils/apiClient.tsx";
import {RenderTable} from '../components/RenderTable.tsx';
import {useAuth} from "../hooks/useAuth.tsx";
import {CreateTeamDialog} from "../components/CreateTeamDialog.tsx";
import type {ITeam, ITeamCreateData} from "../types/teamTypes.tsx";
import {useNavigate} from "react-router-dom";
import type {IUser} from "../types/userTypes.tsx";

export default function Teams() {
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [openCreateTeamsDialog, setOpenCreateTeamsDialog] = useState(false);
    const [loading, setLoading] = useState(false);
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
        {key: 'name', header: 'Name'},
        {key: 'description', header: 'Description'},
        {key: 'team_lead_name', header: 'Team Lead'},
        {key: 'member_count', header: 'Members', align: 'center'},
        {key: 'created_at', header: 'Created At', render: team => new Date(team.created_at).toLocaleString()}
    ];

    useEffect(() => {
        fetchTeams();
        fetchTeamLeads()
    }, []);

    const fetchTeamLeads = async () => {
        try {
            const res = await getRequest<IUser[]>('http://localhost:3000/api/users', {
                Authorization: `Bearer ${token}`
            });
            if (res.data) {
                const data = res.data.filter(user => {
                    return user.role==="TEAM_LEAD";
                })
                setUsers(data);
            }
        } catch (err : unknown) {
            setUsers([]);
        }
    };

    const fetchTeams = async () => {
        setLoading(true);
        try {
            const response = await getRequest<ITeam[]>('http://localhost:3000/api/teams', {
                Authorization: `Bearer ${token}`
            });
            if (response.data) setTeams(response.data);
        } catch (err: unknown) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to load teams',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (data: ITeamCreateData) => {
        try {
            const response = await postRequest<{
                data: ITeam
            }, ITeamCreateData>('http://localhost:3000/api/teams', data, {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            });
            if (response.error) throw new Error("Team creation failed");
            await fetchTeams();
            setSnackbar({ open: true, message: 'Team created successfully', severity: 'success' });
        } catch (err: unknown) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Failed to create team',
                severity: 'error'
            });
        }
    };

    return (
        <Box sx={{width: '100%', py: 4, px: {xs: 2, sm: 4, md: 6}, boxSizing: 'border-box'}}>
            <Paper sx={{p: 3, overflowX: 'auto'}}>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>

                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Typography variant="h5">Team Management</Typography>
                    <Box sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap: 1 }} >
                        <Button variant="outlined" sx={{mr: 1}} onClick={()=> navigate('/users')}>
                            Click here to move to Users
                        </Button>
                        <Button variant="contained" startIcon={<GroupAdd/>} onClick={() => setOpenCreateTeamsDialog(true)}>
                            New Team
                        </Button>
                    </Box>
                </Stack>

                <RenderTable data={teams} columns={columns} loading={loading}/>

                <CreateTeamDialog
                    open={openCreateTeamsDialog}
                    onClose={() => setOpenCreateTeamsDialog(false)}
                    onSubmit={handleCreate}
                    users={users}
                />
            </Paper>
        </Box>
    );
}
