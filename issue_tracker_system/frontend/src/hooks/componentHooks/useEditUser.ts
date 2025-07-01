import { useEffect, useState} from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type {IUser, IUserCreateData, IUserUpdateData} from '../../types/user.ts';
import {useSnackbar} from "../customHooks/useSnackBar.ts";
import {useAPI} from "../customHooks/useAPI.ts";

interface EditUserProps {
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
    user: IUser | null;
}

export const useEditUser = ({ onClose, onSubmit, user }: EditUserProps) => {
    const [formData, setFormData] = useState<IUserCreateData>({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        role: user?.role || 'MEMBER',
        team_id: user?.team_id || '',
    });
    const { addSnackbar } = useSnackbar();

    const { execute: updateUser, isLoading: loading } = useAPI<IUser, IUserUpdateData>('/api/users/:id', {
        method: 'PUT',
        onSuccess: () => {
            addSnackbar({ severity: 'success', message: 'User updated successfully' });
            onSubmit();
        },
        onError: (err: unknown) => {
            addSnackbar({ severity: 'error', message: err instanceof Error ? err.message : 'Update operation failed' });
        },
    });

    useEffect(() => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            role: user?.role || 'MEMBER',
            team_id: user?.team_id || '',
        })
    }, [user]);

    const validateForm = (): string | null => {
        if (!formData.name.trim()) return 'Name is required';
        if (formData.name.length < 2) return 'Name must be at least 2 characters';
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) return 'Invalid email';
        if (formData.password && formData.password.length < 6) return 'Password must be at least 6 characters';
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            addSnackbar({ severity : 'error', message : validationError })
            return;
        }
        if (user?.id) {
            await updateUser({ pathParams: { id: user.id }, body: {...formData} });
        }
    };

    const handleRoleChange = (e: SelectChangeEvent) => {
        if (e.target.value !== 'MEMBER' && formData.team_id) {
            setFormData({
                ...formData,
                team_id: '',
                role: e.target.value as IUserCreateData['role'],
            });
        } else {
            setFormData({
                ...formData,
                role: e.target.value as IUserCreateData['role'],
            });
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'MEMBER',
            team_id: '',
        });
        onClose();
    };

    return {
        formData,
        setFormData,
        loading,
        handleRoleChange,
        handleSubmit,
        handleClose,
    };
};