import React, {useMemo} from 'react';
import {Box, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import TaskCard from './TaskCard';
import type {ITask, TTaskStatus} from '../types/task.ts';
import {type DropTargetMonitor, useDrop} from "react-dnd";
import {useAuth} from "../hooks/useAuth.ts";
import {useSnackbar} from "../hooks/useSnackBar.ts";
import {useAPI} from "../hooks/useAPI.ts";
import {createValidationRules, type IValidationRule} from "../utils/taskValidations.ts";

interface IKanbanColumnProps {
    title: string;
    status: TTaskStatus;
    tasks: ITask[];
    onDrop: () => void;
    onTaskClick: (task: ITask) => void;
}

const getColumnColor = (status: TTaskStatus) => {
    switch (status) {
        case 'TODO':
            return {bg: '#f5f5f5', border: '#e0e0e0', hover: '#eeeeee'};
        case 'IN_PROGRESS':
            return {bg: '#e3f2fd', border: '#bbdefb', hover: '#d1eaff'};
        case 'IN_REVIEW':
            return {bg: '#fff8e1', border: '#ffecb3', hover: '#fff3cc'};
        case 'DONE':
            return {bg: '#e8f5e9', border: '#c8e6c9', hover: '#d8edd9'};
        default:
            return {bg: '#f5f5f5', border: '#e0e0e0', hover: '#eeeeee'};
    }
};

const KanbanColumn: React.FC<IKanbanColumnProps> = ({title, status, tasks, onDrop, onTaskClick}) => {
    const {user} = useAuth();
    const {addSnackbar} = useSnackbar();

    const {execute: moveTaskToNewState} = useAPI<ITask, { status: TTaskStatus }>('/api/tasks/:id', {
        method: 'PUT',
        callOnMount: false,
        onSuccess: (_res, context: { oldStatus: string, newStatus: string }) => {
            onDrop();
            addSnackbar({severity: 'success', message: `Task moved from ${context.oldStatus} to ${context.newStatus}`})
        },
        onError: (err: unknown) => {
            addSnackbar({severity: 'error', message: err instanceof Error ? err.message : 'Failed to update task'})
        },
    });

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: async (item: { id: string; status: TTaskStatus }) => {
            const newStatus = status;
            const oldStatus = item.status;

            const rules: IValidationRule[] = createValidationRules({oldStatus, newStatus, userRole: user?.role,});

            const failedRule: IValidationRule | undefined = rules.find(rule => rule.condition);
            if (failedRule && !failedRule.silent) {
                failedRule.message ? addSnackbar({severity: 'error', message: failedRule.message}) : '';
                return;
            }

            await moveTaskToNewState({
                body: {status: status},
                pathParams: {id: item.id},
                context: {oldStatus, newStatus},
            })
        },
        collect: (monitor: DropTargetMonitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const colors = useMemo(() => getColumnColor(status), [status]);

    const handleTaskClick = (task: ITask) => {
        if (user?.role === 'MEMBER') {
            if (user?.id !== task.assignee_id) {
                addSnackbar({severity: 'error', message: 'You can only view tasks assigned to you'})
                return;
            } else if (task.team_id !== user?.team_id) {
                addSnackbar({severity: 'error', message: 'You can only view tasks from your own team'})
                return;
            }
        }
        onTaskClick(task);
    }

    return (
        <Paper
            ref={drop as any}
            sx={{
                p: 2,
                height: 'calc(100vh - 50px)',
                backgroundColor: isOver ? colors.hover : colors.bg,
                border: `2px solid ${colors.border}`,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                boxSizing: 'border-box',
                overflow: 'hidden',
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', transform: 'translateY(-2px)',
                    backgroundColor: colors.hover,
                }
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    position: 'sticky',
                    top: 0,
                    bgcolor: 'inherit',
                    zIndex: 1,
                    p: 1,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 600,
                    color: '#333',
                    borderBottom: `2px solid ${colors.border}`,
                    mb: 1,
                }}
            >
                {title} <Box component="span" sx={{color: '#666', fontWeight: 500}}>({tasks.length})</Box>
            </Typography>
            <Box sx={{
                flex: 1, overflowY: 'auto', '&::-webkit-scrollbar': {width: '6px'},
                '&::-webkit-scrollbar-thumb': {backgroundColor: colors.border, borderRadius: '3px'},
            }}
            >
                {tasks.map((task: ITask) => (
                    <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)}/>
                ))}
            </Box>
        </Paper>
    );
};

export default KanbanColumn;