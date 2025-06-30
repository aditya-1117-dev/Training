import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import type { IUser } from '../types/user.ts';
import type { ITeam, ITeamUpdateData } from '../types/team.ts';
import { useSnackbar } from '../hooks/useSnackBar.ts';
import {useEffect, useState} from "react";

interface EditTeamDialogProps {
    users: IUser[];
    open: boolean;
    onClose: () => void;
    onSubmit: (teamId: string, data: ITeamUpdateData) => Promise<void>;
    team: ITeam | null;
    loading? : boolean
}

export function EditTeamDialog({ open, onClose, onSubmit, users, team, loading = false }: EditTeamDialogProps) {
    const [formData, setFormData] = useState<ITeamUpdateData>({
        name: team?.name || '',
        description: team?.description || '',
        team_lead_id: team?.team_lead_id || '',
    });
    const { addSnackbar } = useSnackbar();

    useEffect(() => {
        if (team) {
            setFormData({
                name: team.name,
                description: team.description || '',
                team_lead_id: team.team_lead_id || '',
            });
        }
    }, [team]);

    const validateForm = (): string | null => {
        if (!formData.name?.trim()) return 'Team name is required';
        if (formData.name.length < 2) return 'Team name must be at least 2 characters';
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            addSnackbar({ severity : 'error', message : validationError })
            return;
        }
        if (team?.id) {
            await onSubmit(team.id, {...formData});
        }
    };

    const handleClose = () => {
        if (team) {
            setFormData({
                name: team.name,
                description: team.description || '',
                team_lead_id: '',
            });
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Team</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Team Name"
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={2}
                        name="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Team Lead</InputLabel>
                        <Select
                            label="Team Lead"
                            value={formData.team_lead_id || ''}
                            onChange={(e) => setFormData({ ...formData, team_lead_id: e.target.value })}
                        >
                            {users.length === 0 && <MenuItem value="">No Team Lead Available</MenuItem>}
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
                <Button onClick={handleClose} disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading} variant="contained">
                    {loading ? 'Updating...' : 'Update Team'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}