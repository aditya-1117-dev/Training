import {useNavigate} from 'react-router-dom';
import {Typography, Button, Box} from '@mui/material';

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                height: '100vh',
                width: '100vw',
                px: 2,
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                Sorry, the page you're looking for doesn't exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{mt: 3}}
            >
                Go Back Home
            </Button>
        </Box>
    );
}
