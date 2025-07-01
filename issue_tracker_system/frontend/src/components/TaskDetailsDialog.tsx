import React from 'react';
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
    CircularProgress
} from '@mui/material';
import type {ITask} from '../types/task.ts';
import type {IUser} from '../types/user.ts';
import TaskActivityLog from './TaskActivityLog.tsx';
import {useAuth} from "../hooks/customHooks/useAuth.ts";
import {priorityColor} from "../utils/taskUtils.ts";
import {useTaskDetails} from "../hooks/componentHooks/useTaskDetails.ts";

interface ITaskDetailsModalProps {
    open: boolean;
    task: ITask | null;
    onClose: () => void;
    onSave: () => void;
    users: IUser[];
}

const TaskDetailsDialog: React.FC<ITaskDetailsModalProps> = ({open, task, onClose, onSave, users}) => {
    const { user } = useAuth();
    const {
        editedTask,
        loading,
        handleChange,
        handleAssigneeChange,
        handleStatusChange,
        handlePriorityChange,
        handleSubmit,
        filterActiveUsers,
        today,
        fetchCurrentTask,
    } = useTaskDetails({ task, onSave, users });

    if (!editedTask) {
        return (
            <Dialog open={open}>
                <DialogContent>
                    <CircularProgress/>
                </DialogContent>
            </Dialog>
        );
    }

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

                        <FormControl fullWidth>
                            <InputLabel>Assign to</InputLabel>
                            <Select label="Assign to" name="assignee_id" value={editedTask?.assignee_id || ''}
                                    disabled={user?.role === 'MEMBER'}
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