import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    type DialogProps,
} from '@mui/material';

interface FormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    submitButtonText: string;
    loading?: boolean;
    children: React.ReactNode;
    maxWidth?: DialogProps['maxWidth'];
    fullWidth?: boolean;
}

const DialogForm: React.FC<FormProps> = ({
                                       open,
                                       onClose,
                                       onSubmit,
                                       title,
                                       submitButtonText,
                                       loading = false,
                                       children,
                                       maxWidth = 'sm',
                                       fullWidth = true,
                                   }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={onSubmit}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : submitButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogForm;