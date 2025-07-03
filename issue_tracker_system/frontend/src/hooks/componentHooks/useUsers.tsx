import {type ChangeEvent, useEffect, useState} from 'react';
import {Chip, IconButton, type SelectChangeEvent, Stack} from '@mui/material';
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

    const columns: IColumn<IUser>[] = [
        {
            key: 'row_number', label: 'ID', width: '5%',
            render: (_, index) => renderRowNumber(index, page, limit),
        },
        {key: 'name', label: 'Name', width: '15%'},
        {key: 'email', label: 'Email', width: '20%'},
        {
            key: 'is_active', label: 'Status', width: '10%',
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
            key: 'role', label: 'User Role', width: '20%', align: 'center',
            render: (user: IUser) => {
                const roleColors = {
                    ADMIN: {'backgroundColor': 'rgba(244, 67, 54, 0.1)', 'color': 'rgba(244, 67, 54, 1)',},
                    TEAM_LEAD: {'backgroundColor': 'rgba(33, 150, 243, 0.1)', 'color': 'rgba(33, 150, 243, 1)',},
                    MEMBER: {'backgroundColor': 'rgba(158, 158, 158, 0.1)', 'color': 'rgba(97, 97, 97, 1)',}
                }
                const role = {
                    ADMIN : 'Admin',
                    TEAM_LEAD: 'Team Lead',
                    MEMBER: 'Member',
                }
                return <Chip label={role[user.role]} size="small"
                             sx={{py: 2, ...roleColors[user.role] }}/>;
            },
        },
        {
            key: 'team_name', label: 'Team', width: '15%', align: 'center',
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
        columns,
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
        handleCloseEditUserDialog
    };
};