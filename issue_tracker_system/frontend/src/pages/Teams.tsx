import { GroupAdd} from '@mui/icons-material';
import { RenderTable} from '../components/table/RenderTable.tsx';
import {CreateTeamDialog} from '../components/CreateTeamDialog.tsx';
import {type FC} from "react";
import {EditTeamDialog} from "../components/EditTeamDialog.tsx";
import {useTeams} from "../hooks/componentHooks/useTeams.ts";
import {PageContainer} from "./PageContainer.tsx";
import {Chip, IconButton, Stack, Tooltip} from '@mui/material';
import {Delete, Edit } from '@mui/icons-material';

const Teams: FC = () => {
    const {
        teams,
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
        teamUpdateLoading,
        handleEditTeam,
        handleDeleteTeam,
        renderRowNumber
    } = useTeams();

    const columns: IColumn<ITeam>[] = [
        {key: 'row_number', label: 'ID', width: '5%', render: (_, index) => renderRowNumber(index)},
        {key: 'name', label: 'Name', width : '15%'},
        {key: 'description', label: 'Description', width : '25%',
            render: (team: ITeam) => {
                const maxLength = 40;
                const description = team.description || '';
                const shortened = description.length > maxLength
                    ? description.slice(0, maxLength) + '...'
                    : description;

                return (
                    <Tooltip title={description}>
                        <span>{shortened}</span>
                    </Tooltip>
                );
            }
        },
        {key: 'team_lead_name', label: 'Team Lead', width : '15%'},
        {key: 'member_count', label: 'Members', align: 'center', width : '10%'},
        {
            key: 'is_active', label: 'Status', width: '15%',
            render: (team: ITeam) => {
                return team.is_active ? (
                    <Chip label="Active" size="small"
                          sx={{py: 2, backgroundColor: 'rgba(76, 175, 80, 0.1)', color: 'rgba(76, 175, 80, 1)'}}/>
                ) : (
                    <Chip label="Inactive" size="small"
                          sx={{py: 2, backgroundColor: 'rgba(244, 67, 54, 0.1)', color: 'rgba(244, 67, 54, 1)'}}/>
                );
            }
        },
        {
            key: 'actions', label: 'Actions', width: '15%', align: 'center',
            render: (team: ITeam) => (
                <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton color="primary" onClick={() => handleEditTeam(team)}
                                disabled={!team.is_active} aria-label={`Edit user ${team.name}`}>
                        <Edit/>
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteTeam(team)} disabled={!team.is_active}>
                        <Delete/>
                    </IconButton>
                </Stack>
            ),
        },
    ];

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