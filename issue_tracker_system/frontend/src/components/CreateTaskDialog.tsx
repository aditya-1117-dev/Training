import React, {type ChangeEvent, useState} from 'react';
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
    Select,
    CircularProgress, type SelectChangeEvent
} from '@mui/material';
import type {IUser} from '../types/user.ts';
import type {ITeam} from '../types/team.ts';
import type {ITask} from '../types/task.ts';
import {useSnackbar} from "../hooks/useSnackBar.ts";
import {useAPI} from "../hooks/useAPI.ts";
import {priorityColor} from "../utils/taskUtils.ts";

interface ITaskModal {
    open: boolean;
    onClose: () => void;
    onSave: () => Promise<void> | void;
    users: IUser[];
    teams: ITeam[];
}

const CreateTaskDialog: React.FC<ITaskModal> = ({open, onClose, onSave, users, teams}) => {
    const [taskData, setTaskData] = useState<ITask>({
        title: '',
        description: '',
        priority: 'MEDIUM',
        team_id: '',
        assignee_id: '',
        estimated_hours: 0,
        due_date: '',
    });
    const {addSnackbar} = useSnackbar();

    const {execute: createNewTask, isLoading: loading} = useAPI<ITask, ITask>('/api/tasks', {
        method: 'POST',
        callOnMount: false,
        onSuccess: () => {
            addSnackbar({severity: 'success', message: 'Task created successfully!'})
            onSave();
        },
        onError: (err: unknown) => {
            addSnackbar({severity: 'error', message: err instanceof Error ? err.message : 'Failed to create task'})
        },
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setTaskData(prev => ({...prev, [name]: value}));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const {name, value} = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'team_id' && {assignee_id: ''}),
        }));
    };

    const handleCancel = () => {
        onClose();
        setTaskData({
            title: '',
            description: '',
            priority: 'MEDIUM',
            team_id: '',
            assignee_id: '',
            estimated_hours: 0,
            due_date: '',
        });
    };

    const validateForm = (): string | null => {
        if (!taskData.title.trim()) return 'Task title is required';
        if (!taskData.description.trim()) return 'Description is required';
        if (!taskData.team_id) return 'Please select a team';
        if (taskData.estimated_hours && taskData.estimated_hours < 0) return 'Estimated hours cannot be negative';
        if (taskData.due_date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const dueDate = new Date(taskData.due_date);
            if (dueDate < today) return 'Due date cannot be in the past';
        }
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            addSnackbar({severity: 'error', message: validationError})
            return;
        }
        await createNewTask({body: taskData})
        handleCancel();
    };

    const filterActiveUsersBySelectedTeamId = users.filter((user: IUser) => {
        if (taskData.team_id) {
            return user.is_active && user.team_id === taskData.team_id;
        }
        return user.is_active;
    });

    const today = new Date().toISOString().split('T')[0];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{'Create New Task'}</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={3} sx={{mt: 2}}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                    />

                    <Stack direction="row" spacing={2}>
                        <FormControl fullWidth required>
                            <InputLabel id='priority'>Priority</InputLabel>
                            <Select name="priority" value={taskData.priority || ''} label="Priority" labelId='priority'
                                    onChange={handleSelectChange} sx={{color: priorityColor[taskData.priority || '']}}>
                                <MenuItem value="LOW" sx={{color: priorityColor.LOW}}> Low</MenuItem>
                                <MenuItem value="MEDIUM" sx={{color: priorityColor.MEDIUM}}>Medium</MenuItem>
                                <MenuItem value="HIGH" sx={{color: priorityColor.HIGH}}>High</MenuItem>
                                <MenuItem value="CRITICAL" sx={{color: priorityColor.CRITICAL}}>Critical</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth required>
                            <InputLabel id='team'>Team</InputLabel>
                            {loading ? (
                                <CircularProgress size={24}/>
                            ) : (
                                <Select name="team_id" value={taskData.team_id || ''} label="Team" labelId='team'
                                        onChange={handleSelectChange} required>
                                    {teams.map(team => (
                                        <MenuItem key={team.id} value={team.id}>
                                            {team.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        </FormControl>
                    </Stack>

                    <FormControl fullWidth>
                        <InputLabel id='assignee'>Assignee</InputLabel>
                        {loading ? (
                            <CircularProgress size={24}/>
                        ) : (
                            <Select name="assignee_id" value={taskData.assignee_id || ''} label="Assignee"
                                    labelId='assignee'
                                    onChange={handleSelectChange}>
                                <MenuItem value="">
                                    <em>Unassigned</em>
                                </MenuItem>
                                {filterActiveUsersBySelectedTeamId.map(user => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    </FormControl>

                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            label="Estimated Hours"
                            name="estimated_hours"
                            type="number"
                            value={taskData.estimated_hours}
                            onChange={handleChange}
                            slotProps={{input: {inputProps: {min: 0}},}}
                        />

                        <TextField
                            label="Due Date"
                            type="date"
                            name="due_date"
                            value={taskData.due_date || ''}
                            onChange={handleChange}
                            fullWidth
                            slotProps={{
                                inputLabel : {shrink:true},
                                input: {inputProps: {min: today},}
                            }}
                        />
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24}/> : 'Create Task'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTaskDialog;