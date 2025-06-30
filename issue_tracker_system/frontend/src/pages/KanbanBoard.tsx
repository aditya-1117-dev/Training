import {type FC, type ChangeEvent, useState} from 'react';
import { Box, Button, Grid, Stack, Typography, type SelectChangeEvent } from '@mui/material';
import KanbanColumn from '../components/KanbanColumn.tsx';
import TaskDetailsDialog from '../components/TaskDetailsDialog.tsx';
import CreateTaskDialog from '../components/CreateTaskDialog.tsx';
import type {ITask, TTaskStatus} from '../types/task.ts';
import {RenderFilters} from "../components/table/RenderFilters.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {useDebounce} from "../hooks/useDebounce.ts";
import type {ITeam} from "../types/team.ts";
import type {IUser} from "../types/user.ts";
import {useAPI} from "../hooks/useAPI.ts";

const columns: { status: TTaskStatus; title: string }[] = [
    { status: 'TODO', title: 'To Do' },
    { status: 'IN_PROGRESS', title: 'In Progress' },
    { status: 'IN_REVIEW', title: 'In Review' },
    { status: 'DONE', title: 'Done' },
];

const KanbanBoard: FC = () => {
    const {user} = useAuth();
    const [assigneeFilter, setAssigneeFilter] = useState<string>('');
    const [teamFilter, setTeamFilter] = useState<string>('');
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const {value: searchTask, setValue: setSearchTask, debouncedValue} = useDebounce<string>('', 1000);
    const {data: teams} = useAPI<ITeam[]>('/api/teams');
    const {data: users} = useAPI<IUser[]>('/api/users');
    const {data: tasks, execute: fetchTasks} = useAPI<ITask[]>('/api/tasks', {
        params : {
            search: debouncedValue,
            assignee_id: assigneeFilter,
            team_id: teamFilter || (user?.role === 'MEMBER' ? user?.team_id : '') || '',
        }
    });

    const filterTeamLeadsAndMembers = users?.filter((user: IUser) => user.role === 'TEAM_LEAD' || user.role === 'MEMBER') || [];
    const filterMembersOfSelectedTaskTeam = filterTeamLeadsAndMembers.filter((user: IUser) => selectedTask?.team_id === user.team_id) || [];
    return (
        <Box sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Welcome to Issue Tracker System
                </Typography>
                {user?.role === 'TEAM_LEAD' && (
                    <Button variant="contained" color="primary" onClick={() => setOpenCreateModal(true)}>
                        Create New Task
                    </Button>
                )}
            </Stack>

            <RenderFilters
                search={{value: searchTask, label: 'Search Tasks',
                    onChange: (e: ChangeEvent<HTMLInputElement>) => setSearchTask(e.target.value),}}
                filters={[{
                        key: 'assignee', label: 'Assignee', value: assigneeFilter,
                        onChange: (e: SelectChangeEvent) => setAssigneeFilter(e.target.value),
                        options: filterTeamLeadsAndMembers.map((user) => ({ value: user.id,  label: user.name } ) ),
                    }, {
                        key: 'team', label: 'Team', value: teamFilter,
                        onChange: (e: SelectChangeEvent) => setTeamFilter(e.target.value),
                        options: teams?.map((team) => ({ value: team.id, label: team.name })) || [],
                    },
                ]}
            />

            <Box sx={{ p: 3, width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
                <Grid container spacing={2} sx={{ width: '100%', margin: 0, display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                    {columns.map((column : { status: TTaskStatus; title: string }) => (
                        <Grid key={column.status} sx={{ flex: 1, minWidth: 0, width: '100%' }}>
                            <KanbanColumn
                                title={column.title}
                                status={column.status}
                                tasks={tasks?.filter(task => task.status === column.status) || []}
                                onTaskClick={(task: ITask) => setSelectedTask(task)}
                                onDrop={() => {
                                    if (fetchTasks) fetchTasks();
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>

                <TaskDetailsDialog
                    open={Boolean(selectedTask)}
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onSave={() => {
                        setSelectedTask(null);
                        if (fetchTasks) fetchTasks();
                    }}
                    users={filterMembersOfSelectedTaskTeam}
                />
            </Box>

            <CreateTaskDialog
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                onSave={() => {
                    setOpenCreateModal(false);
                    if (fetchTasks) fetchTasks();
                }}
                users={filterTeamLeadsAndMembers}
                teams={teams || []}
            />
        </Box>
    );
};

export default KanbanBoard;