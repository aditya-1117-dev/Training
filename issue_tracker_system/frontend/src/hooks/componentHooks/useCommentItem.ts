import React, { useState } from 'react';
import type {IComment} from '../../types/task.ts';
import { useAuth } from "../customHooks/useAuth.ts";
import { useSnackbar } from "../customHooks/useSnackBar.ts";
import { useAPI } from "../customHooks/useAPI.ts";
import type {TActivityItem} from "./useTaskActivityLog.ts";

interface ICommentItemProps {
    setCombinedActivities: React.Dispatch<React.SetStateAction<TActivityItem[]>>;
}

export const useCommentItem = ({ setCombinedActivities }: ICommentItemProps) => {
    const { user } = useAuth();
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const { addSnackbar } = useSnackbar();

    const { execute: editComment } = useAPI<IComment, { content: string }>('/api/comments/:id', {
        method: 'PUT',
        callOnMount: false,
        onSuccess: (response) => {
            setEditingCommentId(null);
            setEditCommentContent('');
            addSnackbar({ severity: 'success', message: 'Comment updated successfully!' });
            if (response.data){
                setCombinedActivities((prev) => {
                    return prev.map((activity) =>
                        'type' in activity && activity.type === 'comment' && activity.id === editingCommentId
                            ? {
                                ...activity,
                                content: response.data?.content,
                                is_edited: response.data?.is_edited,
                                updated_at: response.data?.updated_at,
                            }
                            : activity
                    ) as TActivityItem[];
                });
            }
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
        },
        onError: (err: unknown) => {
            addSnackbar({ severity: 'error', message: err instanceof Error ? err.message : 'Failed to delete comment' });
        },
    });

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

    const handleDeleteComment = async ( id : string) => {
        await deleteComment({ pathParams: { id: id } })
        setCombinedActivities((prev) => prev.filter((activity) => activity.id !== id));
    }

    return {
        user,
        editingCommentId,
        setEditingCommentId,
        editCommentContent,
        setEditCommentContent,
        handleUpdateComment,
        handleEditComment,
        handleDeleteComment,
    };
};