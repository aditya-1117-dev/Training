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
    MenuItem, type SelectChangeEvent
} from '@mui/material';
import type {IUser, IUserUpdateData} from '../types/user.ts';
import type {ITeam, ITeamCreateData} from '../types/team.ts';
import {useState} from "react";
import {useSnackbar} from "../hooks/useSnackBar.ts";
import {useAPI} from "../hooks/useAPI.ts";

interface ICreateTeamDialog {
    users: IUser[];
    open: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
}

export function CreateTeamDialog({open, onClose, onSubmit, users}: ICreateTeamDialog) {
    const [formData, setFormData] = useState<ITeamCreateData>({
        name: '',
        description: '',
        team_lead_id: '',
    });
    const {addSnackbar} = useSnackbar();

    const {execute: updateUser, isLoading: userUpdateLoading} = useAPI<IUser, IUserUpdateData>('/api/users/:id', {
        method: 'PUT',
        onError: (err: unknown) => {
            addSnackbar( { severity : 'error', message : err instanceof Error ? err.message : 'Update operation failed'})
        },
    });

    const {execute: postNewTeam, isLoading: postNewTeamLoading} = useAPI<ITeam, ITeamCreateData>('/api/teams', {
        method: "POST",
        onSuccess: () => {
            addSnackbar( { severity : 'success', message : 'Team created successfully!'})
        },
        onError: (err: unknown) => {
            addSnackbar( { severity : 'error', message : err instanceof Error ? err.message : 'Failed to create team'})
        },
    })

    const validateForm = () => {
        if (!formData.name.trim()) return 'Team name is required';
        if (formData.name.length < 2) return 'Team name must be at least 2 characters';
        if (formData.description && formData.description.length > 255) return 'Description must be less than 255 characters';
        if (!formData.team_lead_id) return 'Please select a team lead';
        return null;
    };

    const createNewTeam = async (memberID: string) => {
        const validationError = validateForm();
        if (validationError) {
            addSnackbar({severity: 'error', message: validationError})
            return;
        }
        try {
            await updateUser({body: {role: 'TEAM_LEAD'}, pathParams: {id: memberID}});

            await postNewTeam( {body: formData });

            onSubmit();
            handleClose();
        } catch (err: unknown) {
            addSnackbar( { severity : 'error', message : err instanceof Error ? err.message : 'Failed to create team'})
        }
    };

    const handleClose = () => {
        setFormData({name: '', description: '', team_lead_id: ''});
        onClose();
    };

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData({...formData, team_lead_id: e.target.value as string});
    };

    const loading = userUpdateLoading || postNewTeamLoading

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