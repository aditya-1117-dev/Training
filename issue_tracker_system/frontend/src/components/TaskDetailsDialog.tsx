import React from 'react';
import {
    TextField,
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
import {useTaskDetails} from "../hooks/componentHooks/useTaskDetails.ts";
import DialogForm from "./DialogForm.tsx";

interface ITaskDetailsModalProps {
    open: boolean;
    task: ITask | null;
    onClose: () => void;
    onSave: () => void;
    users: IUser[];
}

const TaskDetailsDialog: React.FC<ITaskDetailsModalProps> = ({open, task, onClose, onSave, users}) => {
    const {
        user,
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
        handleCloseTaskDetailsDialog
    } = useTaskDetails({task, onSave, users, onClose});

    return (
        <DialogForm
            open={open}
            onClose={handleCloseTaskDetailsDialog}
            onSubmit={handleSubmit}
            title="Task Details"
            submitButtonText="Save Changes"
            loading={loading}
            maxWidth="md"
        >
            {!editedTask
                ? <CircularProgress/>
                : <Stack spacing={3} sx={{mt: 2}}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={editedTask?.title || ''}
                        onChange={handleChange}
                        disabled={!!user && user?.role === 'MEMBER'}
                        variant={(!!user && user?.role === 'MEMBER')? 'filled' : 'outlined'}
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
                                variant={(!!user && user?.role === 'MEMBER' && task?.status === 'DONE')? 'filled' : 'outlined'}
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

                        <FormControl fullWidth variant={!!user && user?.role === 'MEMBER' ? 'filled' : 'outlined'}>
                            <InputLabel id='priority' >Priority</InputLabel>
                            <Select
                                value={editedTask?.priority || ''}
                                labelId='priority'
                                label="Priority"
                                onChange={handlePriorityChange}
                                disabled={!!user && user?.role === 'MEMBER'}
                            >
                                <MenuItem value="LOW"> Low</MenuItem>
                                <MenuItem value="MEDIUM">Medium</MenuItem>
                                <MenuItem value="HIGH">High</MenuItem>
                                <MenuItem value="CRITICAL">Critical</MenuItem>
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
                            variant={(!!user && user?.role === 'MEMBER')? 'filled' : 'outlined'}
                            slotProps={{
                                inputLabel: {shrink: true},
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
                            slotProps={{
                                input: {inputProps: {min: 0},}
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Actual Hours"
                            name="actual_hours"
                            type="number"
                            value={editedTask?.actual_hours || ''}
                            onChange={handleChange}
                            slotProps={{
                                input: {inputProps: {min: 0},}
                            }}
                        />
                    </Stack>

                    <FormControl fullWidth variant={(user?.role === 'MEMBER')? 'filled' : 'outlined'} >
                        <InputLabel>Assign to</InputLabel>
                        <Select label="Assign to" name="assignee_id"
                                value={editedTask?.assignee_id || 'unassigned'}
                                disabled={user?.role === 'MEMBER'}
                                onChange={handleAssigneeChange}>
                            <MenuItem value="unassigned">
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

                    <TaskActivityLog task={editedTask}
                                     onUpdate={() => fetchCurrentTask({pathParams: {id: task?.id as string}})}/>
                </Stack>
            }
        </DialogForm>
    );
};

export default TaskDetailsDialog;