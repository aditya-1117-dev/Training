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
import type {IUser} from '../types/user.ts';
import {useCreateTeam} from "../hooks/componentHooks/useCreateTeam.ts";

interface ICreateTeamDialog {
    users: IUser[];
    open: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
}

export function CreateTeamDialog({open, onClose, onSubmit, users}: ICreateTeamDialog) {
    const {
        formData,
        loading,
        handleFormDataChange,
        handleSelectChange,
        createNewTeam,
        handleClose
    } = useCreateTeam({onClose, onSubmit,});

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Create New Team</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{mt: 1}}>
                    <TextField
                        label="Team Name"
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleFormDataChange}
                        required
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={2}
                        name="description"
                        value={formData.description}
                        onChange={handleFormDataChange}
                    />

                    <FormControl fullWidth required>
                        <InputLabel>Team Lead</InputLabel>
                        <Select label="Team Lead" value={formData.team_lead_id} onChange={handleSelectChange}>
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
                <Button onClick={() => createNewTeam(formData.team_lead_id)} disabled={loading} variant="contained">
                    {loading ? 'Creating...' : 'Create Team'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}