import React from 'react';
import { Typography, Box } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import type { IHistory } from '../types/task.ts';

interface IHistoryItem {
    history: IHistory;
}

const HistoryItem: React.FC<IHistoryItem> = ({ history }) => {
    return (
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
                <strong>{history.user_name}</strong> changed{' '}
                <strong>{history.field_changed}</strong> from "
                {history.old_value || 'None'}" to "
                {history.new_value || 'None'}"{' '}
                <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                >
                    {new Date(history.created_at).toLocaleString()}
                </Typography>
            </Typography>
        </Box>
    );
};

export default HistoryItem;