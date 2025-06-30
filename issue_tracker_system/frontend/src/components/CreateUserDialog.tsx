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
    Select, type SelectChangeEvent
} from '@mui/material';
import type {IUserCreateData} from '../types/user.ts';
import type {ITeam} from '../types/team.ts';
import {useState} from "react";
import {useSnackbar} from "../hooks/useSnackBar.ts";

interface CreateUserDialogProps {
    teams: ITeam[];
    open: boolean;
    onClose: () => void;
    onSubmit: (data: IUserCreateData) => Promise<void>;
    loading?: boolean;
}

export function CreateUserDialog({open, onClose, onSubmit, teams, loading = false}: CreateUserDialogProps) {
    const [formData, setFormData] = useState<IUserCreateData>({
        name: '',
        email: '',
        password: '',
        role: 'MEMBER',
    });
    const {addSnackbar} = useSnackbar();

    const validateForm = (): string | null => {
        if (!formData.name.trim()) return 'Name is required';
        if (formData.name.length < 2) return 'Name must be at least 2 characters';
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) return 'Invalid email';
        if (formData.password.length < 6) return 'Password must be at least 6 characters';
        return null;
    };

    const createNewUser = async () => {
        const validationError = validateForm();
        if (validationError) {
            addSnackbar({severity: 'error', message: validationError})
            return;
        }
        await onSubmit(formData);
        handleClose();
    };

    const handleRoleChange = (e: SelectChangeEvent) => {
        if (e.target.value !== 'MEMBER' && formData.team_id) {
            setFormData({
                ...formData,
                role: e.target.value as IUserCreateData['role'],
                team_id: '',
            });
        } else {
            setFormData({
                ...formData,
                role: e.target.value as IUserCreateData['role'],
            });
        }
    };

    const handleClose = () => {
        setFormData({name: '', email: '', password: '', role: 'MEMBER'});
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData({...formData, team_id: e.target.value});
    };

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