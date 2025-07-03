import {
    TextField,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {useCreateTeam} from "../hooks/componentHooks/useCreateTeam.ts";
import DialogForm from "./DialogForm.tsx";

interface ICreateTeamDialog {
    open: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
}

export function CreateTeamDialog({open, onClose, onSubmit}: ICreateTeamDialog) {
    const {
        activeSoloMembers,
        formData,
        loading,
        handleFormDataChange,
        handleSelectChange,
        createNewTeam,
        handleClose
    } = useCreateTeam({open, onClose, onSubmit,});

    return (
        <DialogForm
            open={open}
            onClose={handleClose}
            onSubmit={() => createNewTeam(formData.team_lead_id)}
            title="Create New Team"
            submitButtonText={loading ? 'Creating...' : 'Create Team'}
            loading={loading}
            maxWidth="sm"
        >
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
                        {(!activeSoloMembers || activeSoloMembers.length === 0) && <MenuItem value="">No Team Lead Available</MenuItem>}
                        {activeSoloMembers?.map(member => (
                            <MenuItem key={member.id} value={member.id}>
                                {member.name} ({member.email})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        </DialogForm>
    );
}