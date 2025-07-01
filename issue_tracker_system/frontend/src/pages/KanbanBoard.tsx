import {type FC} from 'react';
import type {TTaskStatus} from '../types/task.ts';
import {Box, Button, Grid, Stack, Typography} from '@mui/material';
import KanbanColumn from '../components/KanbanColumn.tsx';
import TaskDetailsDialog from '../components/TaskDetailsDialog.tsx';
import CreateTaskDialog from '../components/CreateTaskDialog.tsx';
import {RenderFilters} from "../components/table/RenderFilters.tsx";
import {useKanbanBoard} from "../hooks/componentHooks/useKanbanBoard.ts";

const KanbanBoard: FC = () => {
    const {
        user,
        columns,
        tasks,
        teams,
        assigneeFilter,
        teamFilter,
        selectedTask,
        openCreateModal,
        searchTask,
        allTeamLeadsAndMembers,
        membersOfSelectedTaskTeam,
        handleSearchChange,
        handleAssigneeChange,
        handleTeamChange,
        handleTaskClick,
        handleCreateModalOpen,
        handleCreateModalClose,
        handleTaskDialogClose,
        handleTaskUpdate,
        handleCreateTask,
        handleOnTaskDrop,
        teamFilterOptions,
        assigneeFilterOptions
    } = useKanbanBoard();

    const filters = [
        {
            key: 'assignee',
            label: 'Assignee',
            value: assigneeFilter,
            onChange: handleAssigneeChange,
            options: assigneeFilterOptions,
        },
    ];

    if (user?.role !== 'MEMBER') {
        filters.push({
            key: 'team',
            label: 'Team',
            value: teamFilter,
            onChange: handleTeamChange,
            options: teamFilterOptions,
        });
    }

    return (
        <Box sx={{p: 3}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1"> Welcome to Issue Tracker System </Typography>
                {user?.role === 'TEAM_LEAD' && (
                    <Button variant="contained" color="primary" onClick={handleCreateModalOpen}>
                        Create New Task
                    </Button>
                )}
            </Stack>

            <RenderFilters filters={filters}
                           search={{value: searchTask, label: 'Search Tasks', onChange: handleSearchChange}}/>

            <Box sx={{
                width: '100%',
                boxSizing: 'border-box',
                overflow: 'hidden',
                overflowX: 'auto',
                paddingBottom: '2%'
            }}>
                <Grid container spacing={2} sx={{
                    width: '100%',
                    margin: 0,
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'space-between'
                }}>
                    {columns.map((column: { status: TTaskStatus; title: string }) => (
                        <Grid key={column.status} sx={{flex: 1, minWidth: 200, width: '100%'}}>
                            <KanbanColumn
                                title={column.title}
                                status={column.status}
                                tasks={tasks?.filter(task => task.status === column.status) || []}
                                onTaskClick={handleTaskClick}
                                onDrop={handleOnTaskDrop}
                            />
                        </Grid>
                    ))}
                </Grid>

                <TaskDetailsDialog
                    open={Boolean(selectedTask)}
                    task={selectedTask}
                    onClose={handleTaskDialogClose}
                    onSave={handleTaskUpdate}
                    users={membersOfSelectedTaskTeam}
                />
            </Box>

            <CreateTaskDialog
                open={openCreateModal}
                onClose={handleCreateModalClose}
                onSave={handleCreateTask}
                users={allTeamLeadsAndMembers}
                teams={teams || []}
            />
        </Box>
    );
};

export default KanbanBoard;