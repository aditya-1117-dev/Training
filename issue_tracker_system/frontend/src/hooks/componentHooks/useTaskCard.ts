import { useMemo } from 'react';
import type { DragSourceMonitor } from 'react-dnd';
import { useDrag } from 'react-dnd';
import type { ITask, TTaskStatus } from '../../types/task.ts';

interface TaskCardProps {
    task: ITask;
}

const getBorderColor = (status: TTaskStatus | undefined) => {
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

export const useTaskCard = ({ task }: TaskCardProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id, status: task.status as TTaskStatus },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const borderColor = useMemo(() => getBorderColor(task?.status), [task]);

    return {
        isDragging,
        drag,
        borderColor,
    };
};