import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const CreatePostPage = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Must have at least one (Text OR Image)
        if (!text && !image) {
            setError('Please provide either text or an image URL.');
            return;
        }

        try {
            await axios.post('/posts', { text, image });
            navigate('/'); // Go back to Feed after posting
        } catch (err) {
            setError('Failed to create post. Please try again.');
            console.error(err);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Post
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="What's on your mind?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Image URL (Optional)"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        margin="normal"
                        helperText="Paste a link to an image (e.g., from Unsplash or Google)"
                    />

                    {/* Image Preview */}
                    {image && (
                        <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                            <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                        </Box>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Post
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CreatePostPage;