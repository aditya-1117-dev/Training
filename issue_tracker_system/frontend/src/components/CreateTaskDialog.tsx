import React from 'react';
import {
    TextField,
    MenuItem,
    Stack,
    FormControl,
    InputLabel,
    Select,
    CircularProgress
} from '@mui/material';
import type {IUser} from '../types/user.ts';
import type {ITeam} from '../types/team.ts';
import {priorityColor} from "../utils/taskUtils.ts";
import {useCreateTask} from "../hooks/componentHooks/useCreateTask.ts";
import DialogForm from "./DialogForm.tsx";

interface ITaskModal {
    open: boolean;
    onClose: () => void;
    onSave: () => Promise<void> | void;
    users: IUser[];
    teams: ITeam[];
}

const CreateTaskDialog: React.FC<ITaskModal> = ({open, onClose, onSave, users, teams}) => {
    const {
        taskData,
        loading,
        handleChange,
        handleSelectChange,
        handleCancel,
        handleSubmit,
        filterActiveUsersBySelectedTeamId,
        today
    } = useCreateTask({onClose, onSave, users});

    return (
        <DialogForm
            open={open}
            onClose={handleCancel}
            onSubmit={handleSubmit}
            title="Create New Task"
            submitButtonText={loading ? 'Creating...' : 'Create Task'}
            loading={loading}
            maxWidth="md"
        >
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
                        <InputLabel id="priority">Priority</InputLabel>
                        <Select
                            name="priority"
                            value={taskData.priority || ''}
                            label="Priority"
                            labelId="priority"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="LOW" >Low</MenuItem>
                            <MenuItem value="MEDIUM" >Medium</MenuItem>
                            <MenuItem value="HIGH" >High</MenuItem>
                            <MenuItem value="CRITICAL" >Critical</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth required>
                        <InputLabel id="team">Team</InputLabel>
                        <Select
                            name="team_id"
                            value={taskData.team_id || ''}
                            label="Team"
                            labelId="team"
                            onChange={handleSelectChange}
                            required
                        >
                            {teams.map((team) => (
                                <MenuItem key={team.id} value={team.id}>
                                    {team.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <FormControl fullWidth>
                    <InputLabel id="assignee">Assignee</InputLabel>
                    <Select
                        name="assignee_id"
                        value={taskData.assignee_id || ''}
                        label="Assignee"
                        labelId="assignee"
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="">
                            <em>Unassigned</em>
                        </MenuItem>
                        {filterActiveUsersBySelectedTeamId.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Stack direction="row" spacing={2}>
                    <TextField
                        fullWidth
                        label="Estimated Hours"
                        name="estimated_hours"
                        type="number"
                        value={taskData.estimated_hours}
                        onChange={handleChange}
                        slotProps={{input: {inputProps: {min: 0}}}}
                    />
                    <TextField
                        label="Due Date"
                        type="date"
                        name="due_date"
                        value={taskData.due_date || ''}
                        onChange={handleChange}
                        fullWidth
                        slotProps={{
                            inputLabel: {shrink: true},
                            input: {inputProps: {min: today}},
                        }}
                    />
                </Stack>
            </Stack>
        </DialogForm>
    );
};

export default CreateTaskDialog;