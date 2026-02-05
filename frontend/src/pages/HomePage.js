import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import PostCard from '../components/PostCard';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/posts');
                setPosts(res.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 10 }}>
            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : posts.length === 0 ? (
                <Typography variant="h6" align="center" color="textSecondary" mt={4}>
                    No posts yet. Be the first to post!
                </Typography>
            ) : (
                posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))
            )}

            {/* Floating Action Button for creating a post (Only if logged in) */}
            {user && (
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: 'fixed', bottom: 20, right: 20 }}
                    onClick={() => navigate('/create')}
                >
                    <AddIcon />
                </Fab>
            )}
        </Container>
    );
};

export default HomePage;