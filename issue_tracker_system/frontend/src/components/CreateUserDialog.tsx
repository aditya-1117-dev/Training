import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, MenuItem, Stack, FormControl, InputLabel, Select, Alert, Snackbar
} from '@mui/material';
import type {IUserCreateData} from "../types/userTypes.tsx";
import type {ITeam} from "../types/teamTypes.tsx";

interface CreateUserDialogProps {
    teams : ITeam[]
    open: boolean;
    onClose: () => void;
    onSubmit: (data: IUserCreateData) => Promise<void>;
}

export function CreateUserDialog({ open, onClose, onSubmit, teams }: CreateUserDialogProps) {
    const [formData, setFormData] = useState<IUserCreateData>({
        name: '',
        email: '',
        password: '',
        role: 'MEMBER'
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'error',
    });

    const validateForm = (): string | null => {
        if (!formData.name.trim()) return "Name is required";
        if (formData.name.length < 2) return "Name must be at least 2 characters";
        if (!/^[A-Za-z ]+$/.test(formData.name)) return "Name should only contain letters";
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) return "Invalid email";
        if (formData.password.length < 6) return "Password must be at least 6 characters";
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            setSnackbar({ open: true, message: validationError, severity: 'error' });
            return;
        }
        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'MEMBER'
            })
            setSnackbar({ open: true, message: 'User created successfully!', severity: 'success' });
        } catch (err : unknown) {
            setSnackbar({
                open: true,
                message: err instanceof Error ? err.message : 'Creation failed',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create New User</DialogTitle>
            <DialogContent dividers>
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
                <Stack spacing={2} sx={{ mt: 1 }}>

                    <TextField
                        label="Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />

                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />

                    <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={formData.role}
                            label="Role"
                            onChange={(e) => setFormData({
                                ...formData,
                                role: e.target.value as IUserCreateData['role']
                            })}
                        >
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="TEAM_LEAD">Team Lead</MenuItem>
                            <MenuItem value="MEMBER">Member</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Team Name</InputLabel>
                        <Select
                            label="Team Name"
                            value={formData.team_id || ''}
                            onChange={e =>
                                setFormData({ ...formData, team_id: e.target.value })
                            }
                        >
                            {teams.map((team : ITeam) => (
                                <MenuItem key={team.id} value={team.id}>
                                    {team.name} ({team.member_count})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create User'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}