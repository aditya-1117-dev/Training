import {useEffect, useState} from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type { ITeam, ITeamCreateData } from '../../types/team.ts';
import type {IUser, IUserUpdateData} from '../../types/user.ts';
import {useAPI} from "../customHooks/useAPI.ts";
import {useSnackbar} from "../customHooks/useSnackBar.ts";

interface CreateTeamProps {
    open : boolean,
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
}

export const useCreateTeam = ({open, onClose, onSubmit }: CreateTeamProps) => {
    const [formData, setFormData] = useState<ITeamCreateData>({
        name: '',
        description: '',
        team_lead_id: '',
    });
    const {addSnackbar} = useSnackbar();

    const {data: members, execute : fetchMembers} = useAPI<IUser[]>('/api/users', {
        method: "GET",
        callOnMount: false,
        params: {
            limit: '100',
            role: 'MEMBER'
        }
    })

    const {execute: updateUser, isLoading: userUpdateLoading} = useAPI<IUser, IUserUpdateData>('/api/users/:id', {
        method: 'PUT',
        onError: (err: unknown) => {
            addSnackbar( { severity : 'error', message : err instanceof Error ? err.message : 'Update operation failed'})
        },
    });

    const {execute: postNewTeam, isLoading: postNewTeamLoading} = useAPI<ITeam, ITeamCreateData>('/api/teams', {
        method: "POST",
        onSuccess: () => {
            addSnackbar( { severity : 'success', message : 'Team created successfully!'})
        },
        onError: (err: unknown) => {
            addSnackbar( { severity : 'error', message : err instanceof Error ? err.message : 'Failed to create team'})
        },
    })

    useEffect(() => {
        if (open){
            fetchMembers();
        }
    }, [open]);

    const validateForm = () => {
        if (!formData.name.trim()) return 'Team name is required';
        if (formData.name.length < 2) return 'Team name must be at least 2 characters';
        if (formData.description && formData.description.length > 255) return 'Description must be less than 255 characters';
        if (!formData.team_lead_id) return 'Please select a team lead';
        return null;
    };

    const createNewTeam = async (memberID: string) => {
        const validationError = validateForm();
        if (validationError) {
            addSnackbar({severity: 'error', message: validationError})
            return;
        }
        try {
            await updateUser({body: {role: 'TEAM_LEAD'}, pathParams: {id: memberID}});

            await postNewTeam( {body: formData });

            onSubmit();
            handleClose();
        } catch (err: unknown) {
            addSnackbar( { severity : 'error', message : err instanceof Error ? err.message : 'Failed to create team'})
        }
    };

    const handleClose = () => {
        setFormData({name: '', description: '', team_lead_id: ''});
        onClose();
    };

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData({...formData, team_lead_id: e.target.value as string});
    };

    const loading = userUpdateLoading || postNewTeamLoading;

    const activeSoloMembers = members?.filter((member: IUser) => member.team_id == null && member.is_active) || [];

    return {
        activeSoloMembers,
        formData,
        loading,
        handleFormDataChange,
        handleSelectChange,
        createNewTeam,
        handleClose,
    };
};