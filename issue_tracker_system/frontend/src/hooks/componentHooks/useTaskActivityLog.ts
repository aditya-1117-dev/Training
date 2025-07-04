import { useEffect, useMemo, useState } from 'react';
import type { ITask, IComment, IHistory } from '../../types/task.ts';
import { useSnackbar } from "../customHooks/useSnackBar.ts";
import { useAPI } from "../customHooks/useAPI.ts";

interface ITaskActivityLogProps {
    task: ITask;
}

export type TActivityItem = IComment | IHistory;

const getCombinedActivities = (comments: IComment[], history: IHistory[]): TActivityItem[] => {
    const commentItems: TActivityItem[] = (comments || []).map(item => ({
        ...item,
        type: 'comment' as const,
    }));
    const historyItems: TActivityItem[] = (history || []).map(item => ({
        ...item,
        type: 'history' as const,
    }));
    return [...commentItems, ...historyItems].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
};

export const useTaskActivityLog = ({ task }: ITaskActivityLogProps) => {
    const [newComment, setNewComment] = useState('');
    const [combinedActivities, setCombinedActivities] = useState<TActivityItem[]>([]);
    const { addSnackbar } = useSnackbar();

    const taskDeps = useMemo(() => ({comments: task.comments, history: task.history}),
        [task.comments, task.history]);

    useEffect(() => {
        setCombinedActivities(() => getCombinedActivities(task.comments || [], task.history || []));
    }, [taskDeps]);

    const { execute: postNewComment } = useAPI<IComment, { content: string }>('/api/tasks/:id/comments', {
        method: 'POST',
        callOnMount: false,
        onSuccess: (response) => {
            setNewComment('');
            addSnackbar({ severity: 'success', message: 'Comment added successfully!' });
            if (response.data) {
                setCombinedActivities((prev) => [
                    { ...response.data, type: 'comment' as const },
                    ...prev
                ] as TActivityItem[]);
            }
        },
        onError: (err: unknown) => {
            addSnackbar({ severity: 'error', message: err instanceof Error ? err.message : 'Failed to add comment' });
        },
    });

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            addSnackbar({ severity: 'error', message: 'Comment cannot be empty' });
            return;
        }
        await postNewComment({ body: { content: newComment }, pathParams: { id: task.id as string } });
    };

    return {
        newComment,
        setNewComment,
        combinedActivities,
        handleAddComment,
        setCombinedActivities
    };
};