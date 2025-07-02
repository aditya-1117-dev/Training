import {
    TextField,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem, CircularProgress
} from '@mui/material';
import type {IUser} from '../types/user.ts';
import type {ITeam} from '../types/team.ts';
import {useEditTeam} from "../hooks/componentHooks/useEditTeam.ts";
import DialogForm from "./DialogForm.tsx";

interface EditTeamDialogProps {
    users: IUser[];
    open: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
    team: ITeam | null;
}

export function EditTeamDialog({open, onClose, onSubmit, users, team}: EditTeamDialogProps) {
    const {
        formData,
        loading,
        handleChange,
        handleTeamLeadChange,
        handleSubmit,
        handleClose,
    } = useEditTeam({onClose, onSubmit, team})

    return (
        <DialogForm
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            title="Edit Team"
            submitButtonText={loading ? 'Updating...' : 'Update Team'}
            loading={loading}
            maxWidth="sm"
        >
            {!team
                ? <CircularProgress/>
                : <Stack spacing={2} sx={{mt: 1}}>
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
                            onChange={handleTeamLeadChange}
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
            }
        </DialogForm>
    );
}