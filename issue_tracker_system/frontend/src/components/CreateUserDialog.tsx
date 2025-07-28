import {
    TextField,
    MenuItem,
    Stack,
    FormControl,
    InputLabel,
    Select
} from '@mui/material';
import type {ITeam} from '../types/team.ts';
import {useCreateUser} from "../hooks/componentHooks/useCreateUser.ts";
import DialogForm from "./DialogForm.tsx";

interface CreateUserDialogProps {
    teams: ITeam[];
    open: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
}

export function CreateUserDialog({open, onClose, onSubmit, teams}: CreateUserDialogProps) {
    const {
        formData,
        loading,
        handleChange,
        handleRoleChange,
        handleSelectChange,
        handleClose,
        createNewUser
    } = useCreateUser({onClose, onSubmit,});

    return (
        <DialogForm
            open={open}
            onClose={handleClose}
            onSubmit={createNewUser}
            title="Create New User"
            submitButtonText={loading ? 'Creating...' : 'Create User'}
            loading={loading}
            maxWidth="sm"
        >
            <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField
                    label="Name"
                    fullWidth
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    required
                />
                <FormControl fullWidth required>
                    <InputLabel>Role</InputLabel>
                    <Select value={formData.role} label="Role" onChange={handleRoleChange}>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="MEMBER">Member</MenuItem>
                    </Select>
                </FormControl>

                {formData.role === 'MEMBER' && (
                    <FormControl fullWidth>
                        <InputLabel>Team Name</InputLabel>
                        <Select
                            label="Team Name"
                            name="team_id"
                            value={formData.team_id || ''}
                            onChange={handleSelectChange}
                        >
                            {teams.length === 0 && <MenuItem value="">No Team Available</MenuItem>}
                            {teams.map((team: ITeam) => (
                                <MenuItem key={team.id} value={team.id}>
                                    {team.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Stack>
        </DialogForm>
    );
}