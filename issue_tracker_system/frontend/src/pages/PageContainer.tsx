import {Box, Stack, Typography, Button} from '@mui/material';
import type {ReactNode} from 'react';

interface IPageContainer {
    title: string;
    children: ReactNode;
    actionButton?: {
        icon?: ReactNode;
        text: string;
        onClick: () => void;
    };
}

export const PageContainer = ({title, children, actionButton}: IPageContainer) => {
    return (
        <Box sx={{width: '100%', py: 4, px: {xs: 2, sm: 2, md: 2}, boxSizing: 'border-box'}}>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                mb={3}
            >
                <Typography variant="h5" component="h1">{title}</Typography>
                {actionButton && (
                    <Button
                        variant="contained"
                        startIcon={actionButton.icon}
                        onClick={actionButton.onClick}
                    >
                        {actionButton.text}
                    </Button>
                )}
            </Stack>
            {children}
        </Box>
    );
};