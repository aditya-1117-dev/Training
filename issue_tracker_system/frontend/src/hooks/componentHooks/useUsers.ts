import {type ChangeEvent, useEffect, useState} from 'react';
import {type SelectChangeEvent} from '@mui/material';
import type {IUser, IUserUpdateData} from '../../types/user.ts';
import type {ITeam} from '../../types/team.ts';
import {useAPI} from "../customHooks/useAPI.ts";
import {usePagination} from "../customHooks/usePagination.ts";
import {useDebounce} from "../customHooks/useDebounce.ts";
import {useSnackbar} from '../customHooks/useSnackBar.ts';

export const useUsers = () => {
    const {addSnackbar} = useSnackbar();
    const [openCreateUserDialog, setOpenCreateUserDialog] = useState<boolean>(false);
    const [openEditUserDialog, setOpenEditUserDialog] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [teamFilter, setTeamFilter] = useState<string>('all');
    const {page, limit, totalPages, handlePageChange, setTotalItems} = usePagination({
        initialPage: 1,
        initialLimit: 5,
    });
    const {
        value: searchTerm,
        setValue: setSearchTerm,
        debouncedValue: debouncedSearchTerm
    } = useDebounce<string>('', 500, () => handlePageChange(1));

    const {data: teams, execute: fetchTeams} = useAPI<ITeam[]>('/api/teams', {
        method: 'GET',
        callOnMount: false,
    });

    const {data: users, isLoading: usersLoading, execute: fetchUsers} = useAPI<IUser[]>('/api/users', {
        method: 'GET',
        callOnMount: false,
        params: {
            page: JSON.stringify(page),
            limit: JSON.stringify(limit),
            search: debouncedSearchTerm,
            team_id: teamFilter==='all' ? '' : teamFilter,
        },
        onSuccess: (data) => {
            setTotalItems(data.pagination?.total || 0);
        },
    });

    const {execute: updateUser, isLoading: userUpdating} = useAPI<IUser, IUserUpdateData>('/api/users/:id', {
        method: 'PUT',
        onSuccess: () => {
            addSnackbar({severity: 'success', message: 'User deleted successfully'});
        },
        onError: (err: unknown) => {
            addSnackbar({severity: 'error', message: err instanceof Error ? err.message : 'Delete operation failed'});
        },
    });

    useEffect(() => {
        fetchUsers();
    }, [page, limit, debouncedSearchTerm, teamFilter]);

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleEditUser = (user: IUser | null) => {
        setSelectedUser(user);
        setOpenEditUserDialog((openEditUserDialog) => !openEditUserDialog);
    };

    const renderRowNumber = (index: number = 0, page: number, limit: number) => {
        return (page - 1) * limit + index + 1;
    };

    const handleDeleteUser = async (user: IUser) => {
        await updateUser({pathParams: {id: user.id}, body: {...user, is_active: false}})
        fetchUsers();
    }

    const handleCloseEditUserDialog = () => {
        setOpenEditUserDialog(false);
        setSelectedUser(null)
    }

    const handleUpdateUser = () => {
        setOpenEditUserDialog(false);
        setSelectedUser(null);
        fetchUsers();
    }

    const handleOpenCreateNewUserDialog = () => setOpenCreateUserDialog(true)

    const handleCloseCreateNewUserDialog = () => setOpenCreateUserDialog(false)

    const handleCreateNewUser = () => fetchUsers()

    const filterConfig = {
        search: {
            value: searchTerm,
            label: 'Search Users',
            onChange: (e : ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
        },
        filters: [
            {
                key: 'team',
                label: 'Team',
                value: teamFilter,
                onChange: (e : SelectChangeEvent) => {
                    handlePageChange(1);
                    setTeamFilter(e.target.value);
                },
                options: teams?.map((team) => ({
                    value: team.id,
                    label: team.name,
                })) || [],
            }
        ]
    };

    return {
        page,
        users,
        teams,
        totalPages,
        selectedUser,
        usersLoading,
        userUpdating,
        filterConfig,
        openCreateUserDialog,
        openEditUserDialog,
        handlePageChange,
        handleUpdateUser,
        handleCreateNewUser,
        handleCloseCreateNewUserDialog,
        handleOpenCreateNewUserDialog,
        handleCloseEditUserDialog,
        handleEditUser,
        renderRowNumber,
        handleDeleteUser,
        limit
    };
};