import { useMemo } from 'react';
import type { DragSourceMonitor } from 'react-dnd';
import { useDrag } from 'react-dnd';
import type { ITask, TTaskStatus } from '../../types/task.ts';

interface TaskCardProps {
    task: ITask;
}

const getBorderColor = (status: TTaskStatus | undefined) : string => {
    switch (status) {
        case 'TODO':
            return '#9e9e9e';
        case 'IN_PROGRESS':
            return '#2196f3';
        case 'IN_REVIEW':
            return '#ffc107';
        case 'DONE':
            return '#4caf50';
        default:
            return '#9e9e9e';
    }
};

const getDueDateInfo = (dueDate?: string) : {color : string, label : string} | null => {
    if (!dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const isToday = due.getTime() === today.getTime();
    const isOverdue = due < today;

    let color: string;
    let label: string;

    if (isOverdue) {
        color = 'error.main';
        label = `Overdue: ${due.toLocaleDateString()}`;
    } else if (isToday) {
        color = 'warning.main';
        label = `Due Today: ${due.toLocaleDateString()}`;
    } else {
        color = 'success.main';
        label = `Due: ${due.toLocaleDateString()}`;
    }

    return { color, label };
};

export const useTaskCard = ({ task }: TaskCardProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id, status: task.status as TTaskStatus },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const borderColor = useMemo(() => getBorderColor(task?.status), [task]);

    const dueDateInfo = useMemo(() => getDueDateInfo(task.due_date), [task]);

    return {
        isDragging,
        drag,
        borderColor,
        dueDateInfo
    };
};