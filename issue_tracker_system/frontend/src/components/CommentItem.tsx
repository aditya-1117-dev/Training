import React from 'react';
import { Typography, TextField, Button, Stack, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import type {IComment, ITask} from '../types/task.ts';
import { useTaskActivityLog } from '../hooks/componentHooks/useTaskActivityLog.ts';

interface ICommentItem {
    comment: IComment;
    onUpdate: () => void;
}

const CommentItem: React.FC<ICommentItem> = ({ comment, onUpdate }) => {
    const {
        editingCommentId,
        setEditingCommentId,
        editCommentContent,
        setEditCommentContent,
        handleUpdateComment,
        handleEditComment,
        deleteComment,
        user,
    } = useTaskActivityLog({ task: { id: comment.task_id } as ITask, onUpdate });

    return (
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
                        {comment.user_name} commented{' '}
                        {comment.is_edited && (
                            <Typography component="span" variant="subtitle2" sx={{ color: '#888', fontStyle: 'italic' }} >
                                (edited)
                            </Typography>
                        )}
                    </Typography>
                </Stack>
                {user?.id === comment.user_id && (
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            size="small"
                            onClick={() => handleEditComment(comment)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => deleteComment({ pathParams: { id: comment.id } })}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                )}
            </Stack>

            {editingCommentId === comment.id ? (
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
                        {comment.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {new Date(comment.created_at).toLocaleString()}
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default CommentItem;