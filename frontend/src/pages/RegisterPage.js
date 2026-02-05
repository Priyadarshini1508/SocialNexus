import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Box, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/users/register', { username, email, password });

            // Save and Login immediately
            localStorage.setItem('user', JSON.stringify(res.data));

            navigate('/');
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>

                {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}

                <Box component="form" onSubmit={handleRegister} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                        Sign Up
                    </Button>
                    <Box textAlign="center">
                        <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Already have an account? Login
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;