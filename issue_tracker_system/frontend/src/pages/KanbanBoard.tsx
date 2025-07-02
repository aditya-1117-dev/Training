import {type FC} from 'react';
import type {TTaskStatus} from '../types/task.ts';
import {Box, Grid} from '@mui/material';
import KanbanColumn from '../components/KanbanColumn.tsx';
import TaskDetailsDialog from '../components/TaskDetailsDialog.tsx';
import CreateTaskDialog from '../components/CreateTaskDialog.tsx';
import {RenderFilters} from "../components/table/RenderFilters.tsx";
import {useKanbanBoard} from "../hooks/componentHooks/useKanbanBoard.ts";
import {PageContainer} from "./PageContainer.tsx";

const KanbanBoard: FC = () => {
    const {
        columns,
        tasks,
        teams,
        selectedTask,
        openCreateModal,
        allTeamLeadsAndMembers,
        membersOfSelectedTaskTeam,
        handleTaskClick,
        handleOpenCreateModal,
        handleCloseCreateModal,
        handleCloseTaskDialog,
        handleTaskUpdate,
        handleCreateTask,
        handleOnTaskDrop,
        filterConfig
    } = useKanbanBoard();

    return (
        <PageContainer
            title="Welcome to Issue Tracker System"
            actionButton={{
                text: "Create New Task",
                onClick: handleOpenCreateModal
            }}
        >
            <RenderFilters {...filterConfig} />

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
                    onClose={handleCloseTaskDialog}
                    onSave={handleTaskUpdate}
                    users={membersOfSelectedTaskTeam}
                />
            </Box>

            <CreateTaskDialog
                open={openCreateModal}
                onClose={handleCloseCreateModal}
                onSave={handleCreateTask}
                users={allTeamLeadsAndMembers}
                teams={teams || []}
            />
        </PageContainer>
    );
};

export default KanbanBoard;