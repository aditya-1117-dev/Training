import {useState, type ChangeEvent, useEffect} from 'react';
import type {SelectChangeEvent} from '@mui/material';
import type {ITask, TTaskStatus} from '../../types/task.ts';
import type {ITeam} from '../../types/team.ts';
import type {IUser} from '../../types/user.ts';
import {useAuth} from "../customHooks/useAuth.ts";
import {useDebounce} from "../customHooks/useDebounce.ts";
import {useAPI} from "../customHooks/useAPI.ts";

const columns: { status: TTaskStatus; title: string }[] = [
    {status: 'TODO', title: 'To Do'},
    {status: 'IN_PROGRESS', title: 'In Progress'},
    {status: 'IN_REVIEW', title: 'In Review'},
    {status: 'DONE', title: 'Done'},
];

export const useKanbanBoard = () => {
    const {user} = useAuth();
    const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
    const [teamFilter, setTeamFilter] = useState<string>('all');
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const {value: searchTask, setValue: setSearchTask, debouncedValue} = useDebounce<string>('', 1000);

    const {data: teams, execute: fetchTeams} = useAPI<ITeam[]>('/api/teams', {
        method: 'GET',
        callOnMount: false,
    });

    const {data: users, execute: fetchUsers} = useAPI<IUser[]>('/api/users', {
        method: 'GET',
        callOnMount: false,
        params: {
            limit: '100'
        }
    });

    const {data: tasks, execute: fetchTasks} = useAPI<ITask[]>('/api/tasks', {
        method: 'GET',
        params: {
            search: debouncedValue,
            assignee_id: (user?.role === 'MEMBER' ? user.id : (assigneeFilter === 'all' ? '' : assigneeFilter)),
            team_id: (teamFilter === 'all' ? '' : teamFilter) || '',
        },
    });

    useEffect(() => {
        if (user?.role !== 'MEMBER') {
            fetchTeams();
            fetchUsers();
        }
    }, []);

    const allTeamLeadsAndMembers = users?.filter((user: IUser) => user.role === 'TEAM_LEAD' || user.role === 'MEMBER') || [];

    const membersOfSelectedTaskTeam = allTeamLeadsAndMembers.filter((user: IUser) => selectedTask?.team_id === user.team_id);

    const assigneeFilterOptions = allTeamLeadsAndMembers.map((user) => ({value: user.id, label: user.name}));

    const teamFilterOptions = teams?.map((team: ITeam) => ({value: team.id, label: team.name})) || []

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTask(e.target.value);

    const handleAssigneeChange = (e: SelectChangeEvent) => setAssigneeFilter(e.target.value);

    const handleTeamChange = (e: SelectChangeEvent) => setTeamFilter(e.target.value);

    const handleTaskClick = (task: ITask) => setSelectedTask(task);

    const handleOpenCreateModal = () => setOpenCreateModal(true);

    const handleCloseCreateModal = () => setOpenCreateModal(false);

    const handleCloseTaskDialog = () => setSelectedTask(null);

    const handleTaskUpdate = () => {
        setSelectedTask(null);
        fetchTasks();
    };

    const handleCreateTask = () => {
        handleCloseCreateModal();
        if (fetchTasks) fetchTasks();
    };

    const handleOnTaskDrop = () => {
        if (fetchTasks) fetchTasks();
    };

    const filterConfig = {
        search: {
            value: searchTask,
            label: 'Search Tasks',
            onChange: handleSearchChange
        },
        filters: user?.role === 'MEMBER'
            ? []
            : [
                {
                    key: 'assignee',
                    label: 'Assignee',
                    value: assigneeFilter,
                    onChange: handleAssigneeChange,
                    options: assigneeFilterOptions,
                },
                {
                    key: 'team',
                    label: 'Team',
                    value: teamFilter,
                    onChange: handleTeamChange,
                    options: teamFilterOptions,
                }
            ]
    };

    return {
        user,
        columns,
        tasks,
        teams,
        users,
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
        teamFilterOptions,
        assigneeFilterOptions,
        filterConfig
    };
};