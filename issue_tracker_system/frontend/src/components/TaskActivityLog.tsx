import React from 'react';
import {Typography, Divider, TextField, Button, Stack, Box} from '@mui/material';
import type {ITask, IComment, IHistory} from '../types/task.ts';
import {useTaskActivityLog} from '../hooks/componentHooks/useTaskActivityLog.ts';
import CommentItem from './CommentItem.tsx';
import HistoryItem from './HistoryItem.tsx';

interface ITaskActivityLog {
    task: ITask;
    onUpdate: () => void;
}

type TActivityItem = IComment | IHistory;

const TaskActivityLog: React.FC<ITaskActivityLog> = ({task, onUpdate}) => {
    const {
        newComment,
        setNewComment,
        handleAddComment,
        combinedActivities,
    } = useTaskActivityLog({task, onUpdate});

    return (
        <Box sx={{mt: 3, position: 'relative'}}>
            <Typography variant="h6" gutterBottom> Activity Log </Typography>
            <Divider sx={{mb: 3}}/>

            <Stack direction="row" spacing={2} sx={{mb: 4}}>
                <TextField
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{bgcolor: 'white', borderRadius: 1}}
                />
                <Button
                    variant="contained"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    sx={{px: 3}}
                >
                    Post
                </Button>
            </Stack>

            <Box sx={{position: 'relative', pl: 4}}>
                <Box sx={{
                    position: 'absolute', left: '8px', top: 0, bottom: 0,
                    width: '2px', bgcolor: 'grey.300', zIndex: 0,
                }}/>

                {combinedActivities.map((activity: TActivityItem) => (
                    <Box key={activity.id}
                         sx={{
                             mb: 3, position: 'relative', pl: 3,
                             '&:before': {
                                 content: '""', position: 'absolute', left: '-28px', top: '10px',
                                 width: '10px', height: '10px', borderRadius: '50%', zIndex: 1,
                                 bgcolor: 'type' in activity && activity.type === 'comment' ? 'primary.main' : 'grey.500',
                             },
                         }}
                    >
                        {'type' in activity && activity.type === 'comment' ? (
                            <CommentItem comment={activity as IComment} onUpdate={onUpdate}/>
                        ) : (
                            <HistoryItem history={activity as IHistory}/>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default TaskActivityLog;