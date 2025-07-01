import {useEffect, useState} from 'react';
import {Chip, IconButton, Stack} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';
import type {IUser, IUserUpdateData} from '../../types/user.ts';
import type {ITeam} from '../../types/team.ts';
import type {IColumn} from '../../components/table/RenderTable.tsx';
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

    useEffect(() => {
        fetchUsers();
    }, [page, limit, debouncedSearchTerm, teamFilter]);

    useEffect(() => {
        if (users?.length) fetchTeams();
    }, [users]);

    const handleEditUser = (user: IUser | null) => {
        setSelectedUser(user);
        setOpenEditUserDialog((openEditUserDialog) => !openEditUserDialog);
    };

    const renderRowNumber = (index: number = 0, page: number, limit: number) => {
        return (page - 1) * limit + index + 1;
    };

    const {execute: updateUser, isLoading: userUpdating} = useAPI<IUser, IUserUpdateData>('/api/users/:id', {
        method: 'PUT',
        onSuccess: () => {
            addSnackbar({severity: 'success', message: 'User deleted successfully'});
        },
        onError: (err: unknown) => {
            addSnackbar({severity: 'error', message: err instanceof Error ? err.message : 'Delete operation failed'});
        },
    });

    const handleDeleteUser = async (user: IUser) => {
        await updateUser({pathParams: {id: user.id}, body: {...user, is_active: false}})
        fetchUsers();
    }

    const columns: IColumn<IUser>[] = [
        {
            key: 'row_number', label: 'ID', width: '5%',
            render: (_, index) => renderRowNumber(index, page, limit),
        },
        {key: 'name', label: 'Name', width: '10%'},
        {key: 'email', label: 'Email', width: '15%'},
        {
            key: 'is_active', label: 'Active Status', width: '15%',
            render: (user: IUser) => {
                return user.is_active ? (
                    <Chip label="Active" size="small"
                          sx={{py: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)', color: 'rgba(76, 175, 80, 1)'}}/>
                ) : (
                    <Chip label="Inactive" size="small"
                          sx={{py: 2, backgroundColor: 'rgba(244, 67, 54, 0.1)', color: 'rgba(244, 67, 54, 1)'}}/>
                );
            }
        },
        {
            key: 'role', label: 'Role', width: '15%', align: 'center',
            render: (user: IUser) => {
                const roleColors = {
                    ADMIN: {'backgroundColor': 'rgba(244, 67, 54, 0.1)', 'color': 'rgba(244, 67, 54, 1)',},
                    TEAM_LEAD: {'backgroundColor': 'rgba(33, 150, 243, 0.1)', 'color': 'rgba(33, 150, 243, 1)',},
                    MEMBER: {'backgroundColor': 'rgba(158, 158, 158, 0.1)', 'color': 'rgba(97, 97, 97, 1)',}
                }
                return <Chip label={user.role} size="small"
                             sx={{py: 2, ...roleColors[user.role] }}/>;
            },
        },
        {
            key: 'team_name', label: 'Team', width: '15%',
            render: (user: IUser) => user.team_name || '-',
        },
        {
            key: 'actions', label: 'Actions', width: '15%', align: 'center',
            render: (user: IUser) => (
                <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton color="primary" onClick={() => handleEditUser(user)}
                                disabled={!user.is_active} aria-label={`Edit user ${user.name}`}>
                        <Edit/>
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteUser(user)} disabled={!user.is_active}>
                        <Delete/>
                    </IconButton>
                </Stack>
            ),
        },
    ];

    return {
        openCreateUserDialog,
        openEditUserDialog,
        selectedUser,
        teamFilter,
        searchTerm,
        users,
        usersLoading,
        teams,
        page,
        totalPages,
        columns,
        setSearchTerm,
        userUpdating,
        setSelectedUser,
        setOpenEditUserDialog,
        setTeamFilter,
        handlePageChange,
        setOpenCreateUserDialog,
        handleEditUser,
        fetchUsers,
    };
};