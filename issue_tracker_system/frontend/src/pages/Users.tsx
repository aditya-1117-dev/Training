import {Chip, IconButton, Stack} from '@mui/material';
import { PersonAdd, Delete, Edit } from '@mui/icons-material';
import { RenderTable } from '../components/table/RenderTable.tsx';
import { CreateUserDialog } from '../components/CreateUserDialog.tsx';
import { EditUserDialog } from '../components/EditUserDialog.tsx';
import {type FC} from "react";
import {RenderFilters} from "../components/table/RenderFilters.tsx";
import {useUsers} from "../hooks/componentHooks/useUsers.ts";
import {PageContainer} from "./PageContainer.tsx";

const Users : FC = () => {
    const {
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
        renderRowNumber,
        handleEditUser,
        handleDeleteUser,
        limit
    } = useUsers();

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

    return (
        <PageContainer
            title="User Management"
            actionButton={{
                icon: <PersonAdd />,
                text: "New User",
                onClick: handleOpenCreateNewUserDialog
            }}
        >
            <RenderFilters {...filterConfig}/>

            <RenderTable
                data={users || []}
                columns={columns}
                loading={usersLoading || userUpdating}
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <EditUserDialog
                open={openEditUserDialog}
                onClose={handleCloseEditUserDialog}
                onSubmit={handleUpdateUser}
                teams={teams || []}
                user={selectedUser}
            />

            <CreateUserDialog
                open={openCreateUserDialog}
                onClose={handleCloseCreateNewUserDialog}
                onSubmit={handleCreateNewUser}
                teams={teams || []}
            />
        </PageContainer>
    );
}
export default Users;