import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem, Alert, Snackbar
} from '@mui/material';
import type { IUser } from "../types/userTypes.tsx";

interface ICreateTeamDialog {
    users : IUser[]
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; description?: string; team_lead_id: string }) => Promise<void>;
}

export function CreateTeamDialog({ open, onClose, onSubmit, users }: ICreateTeamDialog) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        team_lead_id: ''
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'error' | 'success' }>({
        open: false,
        message: '',
        severity: 'error'
    });

    const validateForm = () => {
        if (!formData.name.trim()) return "Team name is required";
        if (formData.name.length < 2) return "Team name must be at least 2 characters";
        if (formData.description && formData.description.length > 255)
            return "Description must be less than 255 characters";
        if (!formData.team_lead_id) return "Please select a team lead";
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
            setSnackbar({ open: true, message: 'Team created successfully!', severity: 'success' });
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
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Create New Team</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={4000}
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={() => setSnackbar({ ...snackbar, open: false })}
                            severity={snackbar.severity}
                            sx={{ width: '100%' }}
                        >
                            {snackbar.message}
                        </Alert>
                    </Snackbar>

                    <TextField
                        label="Team Name"
                        fullWidth
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={2}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />

                    <FormControl fullWidth required>
                        <InputLabel>Team Lead</InputLabel>
                        <Select
                            label="Team Lead"
                            value={formData.team_lead_id}
                            onChange={e =>
                                setFormData({ ...formData, team_lead_id: e.target.value })
                            }
                        >
                            {users.map(user => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={loading} variant="contained">
                    {loading ? 'Creating...' : 'Create Team'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}