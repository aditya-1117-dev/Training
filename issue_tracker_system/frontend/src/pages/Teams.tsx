import { GroupAdd} from '@mui/icons-material';
import { RenderTable} from '../components/table/RenderTable.tsx';
import {CreateTeamDialog} from '../components/CreateTeamDialog.tsx';
import {type FC} from "react";
import {EditTeamDialog} from "../components/EditTeamDialog.tsx";
import {useTeams} from "../hooks/componentHooks/useTeams.tsx";
import {PageContainer} from "./PageContainer.tsx";

const Teams: FC = () => {
    const {
        teams,
        columns,
        selectedTeam,
        teamsLoading,
        openEditTeamDialog,
        openCreateTeamsDialog,
        soloMembersWithinCurrentTeam,
        setOpenCreateTeamsDialog,
        handleCloseEditTeamDialog,
        handleCloseCreateTeamDialog,
        handleUpdateTeam,
        handleCreateNewTeam,
        teamUpdateLoading
    } = useTeams();


    return (
        <PageContainer
            title="Team Management"
            actionButton={{
                icon: <GroupAdd />,
                text: "New Team",
                onClick: () => setOpenCreateTeamsDialog(true)
            }}
        >
            <RenderTable data={teams || []} columns={columns} loading={teamsLoading || teamUpdateLoading}/>

            <EditTeamDialog
                open={openEditTeamDialog}
                team={selectedTeam}
                users={soloMembersWithinCurrentTeam}
                onClose={handleCloseEditTeamDialog}
                onSubmit={handleUpdateTeam}
            />

            <CreateTeamDialog
                open={openCreateTeamsDialog}
                onClose={handleCloseCreateTeamDialog}
                onSubmit={handleCreateNewTeam}
            />
        </PageContainer>
    );
}
export default Teams;