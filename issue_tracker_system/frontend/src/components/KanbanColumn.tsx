import React from 'react';
import {Box, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import TaskCard from './TaskCard';
import type {ITask, TTaskStatus} from '../types/task.ts';
import {useKanbanColumn} from "../hooks/componentHooks/useKanbanColumn.ts";

interface IKanbanColumnProps {
    title: string;
    status: TTaskStatus;
    tasks: ITask[];
    onDrop: () => void;
    onTaskClick: (task: ITask) => void;
}

const KanbanColumn: React.FC<IKanbanColumnProps> = ({title, status, tasks, onDrop, onTaskClick}) => {
    const {
        isOver,
        drop,
        colors,
        handleTaskClick
    } = useKanbanColumn({status, onDrop, onTaskClick});

    return (
        <Paper
            ref={drop as any}
            sx={{
                p: 2,
                height: 'calc(100vh - 50px)',
                backgroundColor: isOver ? colors.hover : colors.bg,
                border: `2px solid ${colors.border}`,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                boxSizing: 'border-box',
                overflow: 'hidden',
                marginTop: 2,
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', transform: 'translateY(-2px)',
                    backgroundColor: colors.hover,
                }
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    position: 'sticky',
                    top: 0,
                    bgcolor: 'inherit',
                    zIndex: 1,
                    p: 1,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 600,
                    color: '#333',
                    borderBottom: `2px solid ${colors.border}`,
                    mb: 1,
                }}
            >
                {title} <Box component="span" sx={{color: '#666', fontWeight: 500}}>({tasks.length})</Box>
            </Typography>
            <Box sx={{
                flex: 1, overflowY: 'auto', '&::-webkit-scrollbar': {width: '6px'},
                '&::-webkit-scrollbar-thumb': {backgroundColor: colors.border, borderRadius: '3px'},
            }}
            >
                {tasks.map((task: ITask) => (
                    <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)}/>
                ))}
            </Box>
        </Paper>
    );
};

export default KanbanColumn;