import {type ChangeEvent, useEffect, useState} from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type { ITeam, ITeamUpdateData } from '../../types/team.ts';
import {useSnackbar} from "../customHooks/useSnackBar.ts";
import {useAPI} from "../customHooks/useAPI.ts";

interface EditTeamProps {
    onClose: () => void;
    onSubmit: () => Promise<void> | void;
    team: ITeam | null;
}

export const useEditTeam = ({ onClose, onSubmit, team }: EditTeamProps) => {
    const [formData, setFormData] = useState<ITeamUpdateData>({
        name: team?.name || '',
        description: team?.description || '',
        team_lead_id: team?.team_lead_id || '',
    });
    const { addSnackbar } = useSnackbar();

    const { execute: updateTeam, isLoading: loading } = useAPI<ITeam, ITeamUpdateData>('/api/teams/:id', {
        method: 'PUT',
        callOnMount: false,
        onSuccess: () => {
            addSnackbar({ severity: 'success', message: 'Team updated successfully!' });
            onSubmit();
        },
        onError: (err: unknown) => {
            addSnackbar({ severity: 'error', message: err instanceof Error ? err.message : 'Failed to update team' });
        },
    });

    useEffect(() => {
        if (team) {
            setFormData({
                name: team.name,
                description: team.description || '',
                team_lead_id: team.team_lead_id || '',
            });
        }
    }, [team]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData(prev => ({ ...prev, team_lead_id: e.target.value }));
    };

    const validateForm = (): string | null => {
        if (!formData.name?.trim()) return 'Team name is required';
        if (formData.name.length < 2) return 'Team name must be at least 2 characters';
        return null;
    };

    const handleSubmit = async () => {
        const error = validateForm();
        if (error) {
            addSnackbar({ severity: 'error', message: error });
            return;
        }
        if (team?.id) {

            await updateTeam({
                pathParams: { id: team.id },
                body: { ...formData },
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            name: team?.name || '',
            description: team?.description || '',
            team_lead_id: team?.team_lead_id || '',
        });
        onClose();
    };

    return {
        formData,
        loading,
        handleChange,
        handleSelectChange,
        handleSubmit,
        handleClose,
    };
};