import { useEffect, useMemo, useState } from 'react';
import type { ITask, IComment, IHistory } from '../../types/task.ts';
import { useAuth } from "../customHooks/useAuth.ts";
import { useSnackbar } from "../customHooks/useSnackBar.ts";
import { useAPI } from "../customHooks/useAPI.ts";

interface ITaskActivityLogProps {
    task: ITask;
    onUpdate: () => void;
}

type TActivityItem = IComment | IHistory;

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

export const useTaskActivityLog = ({ task, onUpdate }: ITaskActivityLogProps) => {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const { addSnackbar } = useSnackbar();
    const [combinedActivities, setCombinedActivities] = useState<TActivityItem[]>([]);

    const taskDeps = useMemo(() => ({comments: task.comments, history: task.history,}),
        [task.comments, task.history] );

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

    const { execute: editComment } = useAPI<IComment, { content: string }>('/api/comments/:id', {
        method: 'PUT',
        callOnMount: false,
        onSuccess: () => {
            setEditingCommentId(null);
            setEditCommentContent('');
            addSnackbar({ severity: 'success', message: 'Comment updated successfully!' });
            onUpdate();
        },
        onError: (err: unknown) => {
            addSnackbar({ severity: 'error', message: err instanceof Error ? err.message : 'Failed to update comment' });
        },
    });

    const { execute: deleteComment } = useAPI<IComment>('/api/comments/:id', {
        method: 'DELETE',
        callOnMount: false,
        onSuccess: () => {
            addSnackbar({ severity: 'success', message: 'Comment deleted successfully!' });
            onUpdate();
        },
        onError: (err: unknown) => {
            addSnackbar({ severity: 'error', message: err instanceof Error ? err.message : 'Failed to delete comment' });
        },
    });

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            addSnackbar({ severity: 'error', message: 'Comment cannot be empty' });
            return;
        }
        await postNewComment({ body: { content: newComment }, pathParams: { id: task.id as string } });
    };

    const handleUpdateComment = async () => {
        if (!editCommentContent.trim()) {
            addSnackbar({ severity: 'error', message: 'Comment cannot be empty' });
            return;
        }
        await editComment({ body: { content: editCommentContent }, pathParams: { id: editingCommentId as string } });
    };

    const handleEditComment = (comment: IComment) => {
        setEditingCommentId(comment.id);
        setEditCommentContent(comment.content);
    };

    return {
        newComment,
        setNewComment,
        editingCommentId,
        setEditingCommentId,
        editCommentContent,
        setEditCommentContent,
        combinedActivities,
        handleAddComment,
        handleUpdateComment,
        handleEditComment,
        deleteComment,
        user,
    };
};