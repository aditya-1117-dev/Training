import { useState, type ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type { ITask } from '../../types/task.ts';
import {useSnackbar} from "../customHooks/useSnackBar.ts";
import {useAPI} from "../customHooks/useAPI.ts";
import type {IUser} from "../../types/user.ts";

interface CreateTaskProps {
    onClose: () => void;
    onSave: () => Promise<void> | void;
    users : IUser[]
}

export const useCreateTask = ({ onClose, onSave, users }: CreateTaskProps) => {
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

    return {
        filterActiveUsersBySelectedTeamId,
        taskData,
        loading,
        handleChange,
        handleSelectChange,
        handleCancel,
        handleSubmit,
        today,
    };
};