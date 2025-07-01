import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type {IUser, IUserCreateData} from '../../types/user.ts';
import {useSnackbar} from "../customHooks/useSnackBar.ts";
import {useAPI} from "../customHooks/useAPI.ts";

interface CreateUserProps {
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
}

export const useCreateUser = ({  onClose, onSubmit }: CreateUserProps) => {
    const [formData, setFormData] = useState<IUserCreateData>({
        name: '',
        email: '',
        password: '',
        role: 'MEMBER',
    });
    const {addSnackbar} = useSnackbar();

    const { execute: addNewUser, isLoading : loading } = useAPI<IUser, IUserCreateData>('/api/users', {
        method: 'POST',
        onSuccess: () => {
            addSnackbar( { severity : 'success', message : 'User created successfully!' } );
            onSubmit();
        },
        onError: (err: unknown) => {
            addSnackbar( { severity :'error', message : err instanceof Error ? err.message : 'Create operation failed'});
        },
    });

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
        await addNewUser({ body: formData })
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

    return {
        formData,
        loading,
        handleChange,
        handleRoleChange,
        handleSelectChange,
        handleClose,
        createNewUser
    };
};