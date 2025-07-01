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
    Select
} from '@mui/material';
import type {ITeam} from '../types/team.ts';
import {useCreateUser} from "../hooks/componentHooks/useCreateUser.ts";

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
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create New User</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{mt: 1}}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email" type="email"
                        fullWidth
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password" type="password"
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
                            <Select label="Team Name" value={formData.team_id || ''} onChange={handleSelectChange}>
                                {teams.length === 0 && <MenuItem value="">No Team Available</MenuItem>}
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
                <Button onClick={createNewUser} variant="contained" disabled={loading}>
                    {loading ? 'Creating...' : 'Create User'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}