import React, {type ChangeEvent, useEffect} from 'react';
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
    Divider,
    CircularProgress, type SelectChangeEvent
} from '@mui/material';
import type {ITask, TPriority, TTaskStatus} from '../types/task.ts';
import type {IUser} from '../types/user.ts';
import TaskActivityLog from './TaskActivityLog.tsx';
import {useAuth} from "../hooks/useAuth.ts";
import {useSnackbar} from "../hooks/useSnackBar.ts";
import {useAPI} from "../hooks/useAPI.ts";
import {priorityColor} from "../utils/taskUtils.ts";

interface ITaskDetailsModalProps {
    open: boolean;
    task: ITask | null;
    onClose: () => void;
    onSave: () => void;
    users: IUser[];
}

const TaskDetailsDialog: React.FC<ITaskDetailsModalProps> = ({open, task, onClose, onSave, users}) => {
    const {user} = useAuth();
    const {addSnackbar} = useSnackbar();
    const {data: editedTask, setData: setEditedTask, execute: fetchCurrentTask} = useAPI<ITask>('/api/tasks/:id', {
        method: 'GET',
        callOnMount: false,
        onError: (err: unknown) => {
            addSnackbar({severity: 'error', message: err instanceof Error ? err.message : 'Failed to load task'})
        },
    });

    const {execute: saveTheTask, isLoading: loading} = useAPI<ITask, ITask>('/api/tasks/:id', {
        method: 'PUT',
        callOnMount: false,
        onSuccess: () => {
            addSnackbar({severity: 'success', message: 'Task updated successfully!'})
            onSave();
        },
        onError: (err: unknown) => {
            addSnackbar({severity: 'error', message: err instanceof Error ? err.message : 'Failed to update task'})
        },
    });

    useEffect(() => {
        if (task) {
            fetchCurrentTask({pathParams: {id: task.id as string},});
        }
    }, [task]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedTask((prev: ITask | null) => ({...prev!, [name]: value}));
    };

    const handleAssigneeChange = (e: SelectChangeEvent) => {
        const selectedUserId = e.target.value;
        const selectedUser = users.find(user => user.id === selectedUserId);
        setEditedTask((prev: ITask | null) => ({
            ...prev!,
            assignee_id: selectedUserId,
            assignee_name: selectedUser ? `${selectedUser.name} (${selectedUser.email})` : '',
        }));
    };

    const handleStatusChange = (e: SelectChangeEvent) => {
        setEditedTask((prev: ITask | null) => ({...prev!, status: e.target.value as TTaskStatus}));
    };

    const handlePriorityChange = (e: SelectChangeEvent) => {
        setEditedTask((prev: ITask | null) => ({...prev!, priority: e.target.value as TPriority}));
    };

    const validateForm = (): string | null => {
        if (!editedTask?.title.trim()) return 'Task title is required';
        if (!editedTask?.description.trim()) return 'Description is required';
        if (!editedTask?.team_id) return 'Please select a team';
        if (editedTask?.estimated_hours && editedTask?.estimated_hours < 0) return 'Estimated hours cannot be negative';
        if (editedTask?.due_date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const dueDate = new Date(editedTask?.due_date);
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
        await saveTheTask({body: editedTask ?? {} as ITask, pathParams: {id: editedTask?.id as string}});
    }

    const filterActiveUsers = users.filter((user: IUser) => user.is_active)

    if (!editedTask) {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogContent>
                    <CircularProgress/>
                </DialogContent>
            </Dialog>
        );
    }

    const today = new Date().toISOString().split('T')[0];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Task Details</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={3} sx={{mt: 2}}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={editedTask?.title || ''}
                        onChange={handleChange}
                        disabled={!!user && user?.role === 'MEMBER'}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        name="description"
                        value={editedTask?.description || ''}
                        onChange={handleChange}
                    />

                    <Stack direction="row" spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel id='status'>Status</InputLabel>
                            <Select
                                label="Status"
                                labelId='status'
                                disabled={!!user && user?.role === 'MEMBER' && task?.status === 'DONE'}
                                value={editedTask?.status || ''}
                                onChange={handleStatusChange}
                            >
                                <MenuItem value="TODO">To Do</MenuItem>
                                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                                <MenuItem value="IN_REVIEW">In Review</MenuItem>
                                <MenuItem value="DONE">DONE</MenuItem>
                                {user?.role === 'ADMIN' && <MenuItem value="DONE">Done</MenuItem>}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id='priority'>Priority</InputLabel>
                            <Select
                                value={editedTask?.priority || ''}
                                labelId='priority'
                                label="Priority"
                                onChange={handlePriorityChange}
                                sx={{color: priorityColor[editedTask?.priority || '']}}
                                disabled={!!user && user?.role === 'MEMBER'}
                            >
                                <MenuItem value="LOW" sx={{color: priorityColor.LOW}}> Low</MenuItem>
                                <MenuItem value="MEDIUM" sx={{color: priorityColor.MEDIUM}}>Medium</MenuItem>
                                <MenuItem value="HIGH" sx={{color: priorityColor.HIGH}}>High</MenuItem>
                                <MenuItem value="CRITICAL" sx={{color: priorityColor.CRITICAL}}>Critical</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Due Date"
                            type="date"
                            name="due_date"
                            value={editedTask?.due_date || ''}
                            onChange={handleChange}
                            fullWidth
                            disabled={!!user && user?.role === 'MEMBER'}
                            slotProps={{
                                inputLabel : {shrink:true},
                                input: {inputProps: {min: today},}
                            }}
                        />
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            label="Estimated Hours"
                            name="estimated_hours"
                            type="number"
                            value={editedTask?.estimated_hours || ''}
                            onChange={handleChange}
                        />

                        <TextField
                            fullWidth
                            label="Actual Hours"
                            name="actual_hours"
                            type="number"
                            value={editedTask?.actual_hours || ''}
                            onChange={handleChange}
                        />
                    </Stack>

                    {user?.role !== 'MEMBER' && (
                        <FormControl fullWidth>
                            <InputLabel>Assign to</InputLabel>
                            <Select label="Assign to" name="assignee_id" value={editedTask?.assignee_id || ''}
                                    onChange={handleAssigneeChange}>
                                <MenuItem value="">
                                    <em>Unassigned</em>
                                </MenuItem>
                                {filterActiveUsers.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <Divider sx={{my: 2}}/>

                    {editedTask && <TaskActivityLog task={editedTask}
                                                    onUpdate={() => fetchCurrentTask({pathParams: {id: task?.id as string}})}/>}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDetailsDialog;