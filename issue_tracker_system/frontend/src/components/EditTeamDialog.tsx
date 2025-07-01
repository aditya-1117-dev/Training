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
import type { ITeam } from '../types/team.ts';
import {useEditTeam} from "../hooks/componentHooks/useEditTeam.ts";

interface EditTeamDialogProps {
    users: IUser[];
    open: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
    team: ITeam | null;
}

export function EditTeamDialog({ open, onClose, onSubmit, users, team }: EditTeamDialogProps) {
    const {
        formData,
        loading,
        handleChange,
        handleSelectChange,
        handleSubmit,
        handleClose,
    } = useEditTeam({onClose, onSubmit, team})

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
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={2}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Team Lead</InputLabel>
                        <Select
                            label="Team Lead"
                            value={formData.team_lead_id || ''}
                            onChange={handleSelectChange}
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