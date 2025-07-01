import React from 'react';
import {Box, CardContent, Chip, Typography} from '@mui/material';
import Card from '@mui/material/Card';
import type {ITask} from '../types/task.ts';
import {priorityColor} from "../utils/taskUtils.ts";
import {useTaskCard} from "../hooks/componentHooks/useTaskCard.ts";

interface TaskCardProps {
    task: ITask;
    onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({task, onClick}) => {
    const {
        isDragging,
        drag,
        borderColor
    } = useTaskCard({ task });

    return (
        <Card
            ref={drag as any}
            onClick={onClick}
            sx={{
                mb: 2,
                opacity: isDragging ? 0.6 : 1,
                cursor: 'grab',
                transition: 'all 0.2s ease-out',
                borderLeft: '4px solid',
                borderLeftColor: borderColor,
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    borderLeftWidth: '6px',
                },
                '&:active': {cursor: 'grabbing'},
            }}
        >
            <CardContent sx={{p: 2}}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', sm: 'row'},
                    justifyContent: 'space-between',
                    alignItems: {xs: 'flex-start', sm: 'center'},
                    gap: 1,
                    mb: 1
                }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%'
                        }}
                    >
                        {task.title}
                    </Typography>

                    {task.priority && (
                        <Chip
                            label={task.priority}
                            size="small"
                            sx={{
                                backgroundColor: priorityColor[task.priority as keyof typeof priorityColor],
                                color: 'white',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                minWidth: 80,
                                flexShrink: 0
                            }}
                        />
                    )}
                </Box>

                {/* Bottom Row - Assignee and Hours */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', sm: 'row'},
                    justifyContent: 'space-between',
                    alignItems: {xs: 'flex-start', sm: 'center'},
                    gap: 1
                }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: task.assignee_name ? '600' : '400',
                            color: task.assignee_name ? 'text.primary' : 'text.secondary',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%'
                        }}
                    >
                        {task.assignee_name || 'Unassigned'}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: '600',
                            color: task.estimated_hours ? 'text.primary' : 'text.secondary',
                            flexShrink: 0
                        }}
                    >
                        {task.estimated_hours ? `${task.estimated_hours}h` : 'No estimate'}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskCard;