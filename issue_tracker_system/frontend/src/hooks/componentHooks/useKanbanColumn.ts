import { useMemo } from 'react';
import type { DropTargetMonitor } from 'react-dnd';
import { useDrop } from 'react-dnd';
import type { ITask, TTaskStatus } from '../../types/task.ts';
import {useAuth} from "../customHooks/useAuth.ts";
import {useSnackbar} from "../customHooks/useSnackBar.ts";
import {useAPI} from "../customHooks/useAPI.ts";
import {createValidationRules, type IValidationRule} from "../../utils/taskValidations.ts";

interface KanbanColumnProps {
    status: TTaskStatus;
    onDrop: () => void;
    onTaskClick: (task: ITask) => void;
}

const getColumnColor = (status: TTaskStatus) => {
    switch (status) {
        case 'TODO':
            return { bg: '#f5f5f5', border: '#e0e0e0', hover: '#eeeeee' };
        case 'IN_PROGRESS':
            return { bg: '#e3f2fd', border: '#bbdefb', hover: '#d1eaff' };
        case 'IN_REVIEW':
            return { bg: '#fff8e1', border: '#ffecb3', hover: '#fff3cc' };
        case 'DONE':
            return { bg: '#e8f5e9', border: '#c8e6c9', hover: '#d8edd9' };
        default:
            return { bg: '#f5f5f5', border: '#e0e0e0', hover: '#eeeeee' };
    }
};

export const useKanbanColumn = ({ status, onDrop, onTaskClick }: KanbanColumnProps) => {
    const { user } = useAuth();
    const { addSnackbar } = useSnackbar();

    const { execute: moveTaskToNewState } = useAPI<ITask, { status: TTaskStatus }>('/api/tasks/:id', {
        method: 'PUT',
        callOnMount: false,
        onSuccess: (_res, context: { oldStatus: string; newStatus: string }) => {
            onDrop();
            addSnackbar({ severity: 'success', message: `Task moved from ${context.oldStatus} to ${context.newStatus}` });
        },
        onError: (err: unknown) => {
            addSnackbar({ severity: 'error', message: err instanceof Error ? err.message : 'Failed to update task' });
        },
    });

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: async (item: { id: string; status: TTaskStatus }) => {
            const newStatus = status;
            const oldStatus = item.status;

            const rules: IValidationRule[] = createValidationRules({ oldStatus, newStatus, userRole: user?.role });
            const failedRule: IValidationRule | undefined = rules.find(rule => rule.condition);

            if (failedRule) {
                if (!failedRule.silent){
                    failedRule.message ? addSnackbar({ severity: 'error', message: failedRule.message }) : '';
                    return;
                }else {
                    return;
                }
            }

            await moveTaskToNewState({
                body: { status: status },
                pathParams: { id: item.id },
                context: { oldStatus, newStatus },
            });
        },
        collect: (monitor: DropTargetMonitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [onDrop] );

    const colors = useMemo(() => getColumnColor(status), [status]);

    const handleTaskClick = (task: ITask) => {
        if (user?.role === 'MEMBER') {
            if (user?.id !== task.assignee_id) {
                addSnackbar({ severity: 'error', message: 'You can only view tasks assigned to you' });
                return;
            } else if (task.team_id !== user?.team_id) {
                addSnackbar({ severity: 'error', message: 'You can only view tasks from your own team' });
                return;
            }
        }
        onTaskClick(task);
    };

    return {
        isOver,
        drop,
        colors,
        handleTaskClick,
    };
};