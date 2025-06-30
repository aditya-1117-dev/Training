import {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Stack,
    FormControl,
    InputLabel,
    Select,
    type SelectChangeEvent,
} from '@mui/material';
import type {IUser, IUserCreateData, IUserUpdateData} from '../types/user.ts';
import type { ITeam } from '../types/team.ts';
import { useSnackbar } from '../hooks/useSnackBar.ts';
import {useAPI} from "../hooks/useAPI.ts";

interface IEditUserDialogProps {
    teams: ITeam[];
    open: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
    user: IUser | null;
}

export function EditUserDialog({ open, onClose, onSubmit, teams, user }: IEditUserDialogProps) {
    const [formData, setFormData] = useState<IUserCreateData>({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        role: user?.role || 'MEMBER',
        team_id: user?.team_id || '',
    });
    const { addSnackbar } = useSnackbar();

    const { execute: updateUser, isLoading: loading } = useAPI<IUser, IUserUpdateData>('/api/users/:id', {
        method: 'PUT',
        onSuccess: () => {
            addSnackbar({ severity: 'success', message: 'User updated successfully' });
            onSubmit();
        },
        onError: (err: unknown) => {
            addSnackbar({ severity: 'error', message: err instanceof Error ? err.message : 'Update operation failed' });
        },
    });

    useEffect(() => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            role: user?.role || 'MEMBER',
            team_id: user?.team_id || '',
        })
    }, [user]);

    const validateForm = (): string | null => {
        if (!formData.name.trim()) return 'Name is required';
        if (formData.name.length < 2) return 'Name must be at least 2 characters';
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) return 'Invalid email';
        if (formData.password && formData.password.length < 6) return 'Password must be at least 6 characters';
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            addSnackbar({ severity : 'error', message : validationError })
            return;
        }
        if (user?.id) {
            await updateUser({ pathParams: { id: user.id }, body: {...formData} });
        }
    };

    const handleRoleChange = (e: SelectChangeEvent) => {
        if (e.target.value !== 'MEMBER' && formData.team_id) {
            setFormData({
                ...formData,
                team_id: '',
                role: e.target.value as IUserCreateData['role'],
            });
        } else {
            setFormData({
                ...formData,
                role: e.target.value as IUserCreateData['role'],
            });
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'MEMBER',
            team_id: '',
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <FormControl fullWidth required>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={formData.role!=='TEAM_LEAD'? formData.role : ''}
                            label="Role"
                            onChange={handleRoleChange}
                        >
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="MEMBER">Member</MenuItem>
                        </Select>
                    </FormControl>
                    {formData.role === 'MEMBER' && (
                        <FormControl fullWidth>
                            <InputLabel>Team Name</InputLabel>
                            <Select
                                label="Team Name"
                                value={formData.team_id || ''}
                                onChange={(e) => setFormData({ ...formData, team_id: e.target.value })}
                            >
                                {teams.length === 0 && (
                                    <MenuItem value="">No Team Available</MenuItem>
                                )}
                                {teams.map((team: ITeam) => (
                                    <MenuItem key={team.id} value={team.id}>
                                        {team.name} ({team.member_count})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update User'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}