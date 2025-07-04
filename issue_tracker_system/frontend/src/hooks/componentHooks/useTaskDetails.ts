import { useEffect, type ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type {ITask, TTaskStatus} from '../../types/task.ts';
import type { IUser } from '../../types/user.ts';
import {useAPI} from "../customHooks/useAPI.ts";
import {useSnackbar} from "../customHooks/useSnackBar.ts";
import {useAuth} from "../customHooks/useAuth.ts";
import {createValidationRules, type IValidationRule} from "../../utils/taskValidations.ts";

interface TaskDetailsProps {
    task: ITask | null;
    onSave: () => void;
    users: IUser[];
    onClose: () => void;
}

export const useTaskDetails = ({ task, onSave, users, onClose }: TaskDetailsProps) => {
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
            setEditedTask(null);
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

    const handleSelectChange = (e: SelectChangeEvent) => {
        const {name, value} = e.target;
        console.log(name)
        setEditedTask((prev: ITask | null) => ({...prev!, [name]: value}));
    };

    const handleStatusChange = (e: SelectChangeEvent) => {
        const { value} = e.target;
        const newStatus = value;
        const oldStatus = task?.status;

        const rules: IValidationRule[] = createValidationRules({
            oldStatus : oldStatus as TTaskStatus,
            newStatus : newStatus as TTaskStatus,
            userRole: user?.role });
        const failedRule: IValidationRule | undefined = rules.find(rule => rule.condition);

        if (failedRule && !failedRule.silent) {
            failedRule.message ? addSnackbar({ severity: 'error', message: failedRule.message }) : '';
            return;
        }
        setEditedTask((prev: ITask | null) => ({...prev!, status: newStatus as TTaskStatus}));
    };

    const handleCloseTaskDetailsDialog = () => {
        setEditedTask(null);
        onClose();
    }

    const handleTaskUpdate = () => fetchCurrentTask({pathParams: {id: task?.id as string}})

    const validateForm = (): string | null => {
        if (!editedTask?.title.trim()) return 'Task title is required';
        if (!editedTask?.description.trim()) return 'Description is required';
        if (!editedTask?.team_id) return 'Please select a team';
        if (editedTask?.estimated_hours && editedTask?.estimated_hours < 0) return 'Estimated hours cannot be negative';
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            addSnackbar({severity: 'error', message: validationError})
            return;
        }

        let taskToSubmit : Record<string, any>  = {}

        const keysToCheck : (keyof ITask)[] = [
            "title",
            "description",
            "status",
            "priority",
            "due_date",
            "estimated_hours",
            "actual_hours",
            "assignee_id",
        ];

        keysToCheck.forEach((key : keyof ITask) => {
            if (key==='assignee_id' && editedTask?.assignee_id === 'unassigned'){
                taskToSubmit[key] = '';
            } else if (task?.[key] !== editedTask?.[key]) {
                taskToSubmit[key] = editedTask?.[key];
            }
        });

        if (Object.keys(taskToSubmit).length > 0){
            await saveTheTask({body: taskToSubmit as ITask, pathParams: {id: editedTask?.id as string}});
        }else {
            onClose();
        }
    }

    const filterActiveUsers = Array.from(new Set(users.filter((user: IUser) => user.is_active)));

    const today = new Date().toISOString().split('T')[0];

    return {
        user,
        editedTask,
        loading,
        handleChange,
        handleAssigneeChange,
        handleSelectChange,
        handleSubmit,
        filterActiveUsers,
        today,
        handleTaskUpdate,
        handleStatusChange,
        handleCloseTaskDetailsDialog
    };
};