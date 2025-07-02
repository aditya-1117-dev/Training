
import { PersonAdd } from '@mui/icons-material';
import { RenderTable } from '../components/table/RenderTable.tsx';
import { CreateUserDialog } from '../components/CreateUserDialog.tsx';
import { EditUserDialog } from '../components/EditUserDialog.tsx';
import {type FC} from "react";
import {RenderFilters} from "../components/table/RenderFilters.tsx";
import {useUsers} from "../hooks/componentHooks/useUsers.tsx";
import {PageContainer} from "./PageContainer.tsx";
import CircularLoading from "../components/CircularLoading.tsx";

const Users : FC = () => {
    const {
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
    } = useUsers();

    if (usersLoading || userUpdating){
        return <CircularLoading />
    }
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
                loading={usersLoading}
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