import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Box, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios'; // Using our configured API

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/users/login', { email, password });

            // Save user data (including Token) to Local Storage
            localStorage.setItem('user', JSON.stringify(res.data));

            navigate('/'); // Go to Home/Feed page
            window.location.reload(); // Refresh to update Navbar
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>

                {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}

                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Box textAlign="center">
                        <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;