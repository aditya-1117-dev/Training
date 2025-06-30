import React, {useMemo, useState} from 'react';
import { Typography, Divider, TextField, Button, Stack, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import CommentIcon from '@mui/icons-material/Comment';
import type { ITask, IComment, IHistory } from '../types/task.ts';
import {useAuth} from "../hooks/useAuth.ts";
import {useSnackbar} from "../hooks/useSnackBar.ts";
import {useAPI} from "../hooks/useAPI.ts";

interface ITaskActivityLog {
    task: ITask;
    onUpdate: () => void;
}

type TActivityItem = IComment | IHistory;

const getCombinedActivities = (comments : IComment[] , history : IHistory[]): TActivityItem[] => {
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

const TaskActivityLog: React.FC<ITaskActivityLog> = ({ task, onUpdate }) => {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const { addSnackbar } = useSnackbar();

    const { execute: postNewComment } = useAPI<IComment, { content : string }>('/api/tasks/:id/comments', {
        method: 'POST',
        callOnMount: false,
        onSuccess: () => {
            setNewComment('');
            addSnackbar({ severity : 'success', message : 'Comment added successfully!' })
            onUpdate();
        },
        onError: (err: unknown) => {
            addSnackbar({ severity : 'error', message : err instanceof Error ? err.message : 'Failed to add comment' })
        },
    })

    const { execute: editComment } = useAPI<IComment, { content: string }>('/api/comments/:id', {
        method: 'PUT',
        callOnMount: false,
        onSuccess: () => {
            setEditingCommentId(null);
            setEditCommentContent('');
            addSnackbar({ severity : 'success', message : 'Comment updated successfully!' })
            onUpdate();
        },
        onError: (err: unknown) => {
            addSnackbar({ severity : 'error', message : err instanceof Error ? err.message : 'Failed to update comment' })
        },
    })

    const { execute: deleteComment } = useAPI<IComment>('/api/comments/:id', {
        method: 'DELETE',
        callOnMount: false,
        onSuccess: () => {
            addSnackbar({ severity : 'success', message : 'Comment deleted successfully!' })
            onUpdate();
        },
        onError: (err: unknown) => {
            addSnackbar({ severity : 'error', message : err instanceof Error ? err.message : 'Failed to delete comment' })
        },
    })

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            addSnackbar({ severity : 'error', message : 'Comment cannot be empty' })
            return;
        }
        await postNewComment({body: { content: newComment }, pathParams: { id: task.id as string }})
    };

    const handleUpdateComment = async () => {
        if (!editCommentContent.trim()) {
            addSnackbar({ severity : 'error', message : 'Comment cannot be empty' })
            return;
        }
        await editComment({body: { content: editCommentContent }, pathParams: { id: editingCommentId as string }})
    };

    const handleEditComment = (comment: IComment) => {
        setEditingCommentId(comment.id);
        setEditCommentContent(comment.content);
    };

    const combinedActivities = useMemo( () => getCombinedActivities( task.comments || [], task.history || []), [task, task] );

    return (
        <Box sx={{ mt: 3, position: 'relative' }}>
            <Typography variant="h6" gutterBottom>
                Activity Log
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ bgcolor: 'white', borderRadius: 1 }}
                />
                <Button
                    variant="contained"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    sx={{ px: 3 }}
                >
                    Post
                </Button>
            </Stack>

            <Box sx={{ position: 'relative', pl: 4 }}>
                <Box
                    sx={{
                        position: 'absolute',
                        left: '12px',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        bgcolor: 'grey.300',
                        zIndex: 0,
                    }}
                />

                {combinedActivities.map((activity: TActivityItem) => (
                    <Box
                        key={activity.id}
                        sx={{
                            mb: 3,
                            position: 'relative',
                            pl: 3,
                            '&:before': {
                                content: '""',
                                position: 'absolute',
                                left: '-28px',
                                top: '10px',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                bgcolor: 'type' in activity && activity.type === 'comment' ? 'primary.main' : 'grey.500',
                                zIndex: 1,
                            },
                        }}
                    >
                        {'type' in activity && activity.type === 'comment' ? (
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: 'white',
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                    borderRadius: 1,
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                }}
                            >
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <CommentIcon fontSize="small" color="primary" />
                                        <Typography variant="subtitle2">
                                            {activity.user_name} commented{' '}
                                            {(activity as IComment).is_edited && '(edited)'}
                                        </Typography>
                                    </Stack>
                                    {user?.id === activity.user_id && (
                                        <Stack direction="row" spacing={1}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEditComment(activity as IComment)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => deleteComment({ pathParams: { id: activity.id } })}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    )}
                                </Stack>

                                {editingCommentId === activity.id ? (
                                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            value={editCommentContent}
                                            onChange={(e) => setEditCommentContent(e.target.value)}
                                            sx={{ bgcolor: 'grey.50' }}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleUpdateComment}
                                            disabled={!editCommentContent.trim()}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setEditingCommentId(null)}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                ) : (
                                    <>
                                        <Typography
                                            variant="body2"
                                            sx={{ mt: 1, whiteSpace: 'pre-wrap', color: 'text.primary' }}
                                        >
                                            {(activity as IComment).content}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(activity.created_at).toLocaleString()}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    py: 1,
                                    px: 2,
                                    bgcolor: 'grey.100',
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <HistoryIcon fontSize="small" sx={{ color: 'grey.600' }} />
                                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                    <strong>{activity.user_name}</strong> changed{' '}
                                    <strong>{(activity as IHistory).field_changed}</strong> from "
                                    {(activity as IHistory).old_value || 'None'}" to "
                                    {(activity as IHistory).new_value || 'None'}"{' '}
                                    <Typography
                                        component="span"
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {new Date(activity.created_at).toLocaleString()}
                                    </Typography>
                                </Typography>
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default TaskActivityLog;