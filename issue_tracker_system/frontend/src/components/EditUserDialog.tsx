import {
    TextField,
    MenuItem,
    Stack,
    FormControl,
    InputLabel,
    Select, CircularProgress,
} from '@mui/material';
import type {IUser} from '../types/user.ts';
import type {ITeam} from '../types/team.ts';
import {useEditUser} from "../hooks/componentHooks/useEditUser.ts";
import DialogForm from "./DialogForm.tsx";

interface IEditUserDialogProps {
    teams: ITeam[];
    open: boolean;
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
    user: IUser | null;
}

export function EditUserDialog({open, onClose, onSubmit, teams, user}: IEditUserDialogProps) {
    const {
        formData,
        loading,
        handleRoleChange,
        handleSubmit,
        handleClose,
        setFormData
    } = useEditUser({onClose, onSubmit, user});

    return (
        <DialogForm
            open={open}
            onClose={handleClose}
            onSubmit={handleSubmit}
            title="Edit User"
            submitButtonText={loading ? 'Updating...' : 'Update User'}
            loading={loading}
            maxWidth="sm"
        >
            {!user
                ? <CircularProgress/>
                : <Stack spacing={2} sx={{mt: 1}}>
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
                    />

                    {user?.role !== 'TEAM_LEAD' && (
                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={formData.role !== 'TEAM_LEAD' ? formData.role : ''}
                                label="Role"
                                onChange={handleRoleChange}
                            >
                                <MenuItem value="ADMIN">Admin</MenuItem>
                                <MenuItem value="MEMBER">Member</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {formData.role === 'MEMBER' && (
                        <FormControl fullWidth>
                            <InputLabel>Team Name</InputLabel>
                            <Select
                                label="Team Name"
                                value={formData.team_id || ''}
                                onChange={(e) => setFormData({...formData, team_id: e.target.value})}
                            >
                                {teams.length === 0 && (
                                    <MenuItem value="">No Team Available</MenuItem>
                                )}
                                {teams.map((team: ITeam) => (
                                    <MenuItem key={team.id} value={team.id}>
                                        {team.name} ({team.member_count})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </Stack>
            }
        </DialogForm>
    );
}