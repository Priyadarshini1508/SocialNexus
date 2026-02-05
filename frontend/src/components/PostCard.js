import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, TextField, Button, Box, Divider } from '@mui/material';
import { Favorite, FavoriteBorder, Comment } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import axios from '../api/axios';

const PostCard = ({ post }) => {
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);

    // Get current user ID to check if they already liked the post
    const user = JSON.parse(localStorage.getItem('user'));
    const isLiked = likes.includes(user?._id);

    const handleLike = async () => {
        try {
            const res = await axios.put(`/posts/${post._id}/like`);
            setLikes(res.data); // Update likes from backend response
        } catch (err) {
            console.error(err);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/posts/${post._id}/comment`, { text: commentText });
            setComments(res.data); // Update comments list
            setCommentText(''); // Clear input
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card sx={{ maxWidth: 600, margin: '20px auto', boxShadow: 3 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {post.user?.username ? post.user.username[0].toUpperCase() : 'U'}
                    </Avatar>
                }
                title={post.user?.username || 'Unknown User'}
                subheader={new Date(post.createdAt).toLocaleDateString()}
            />

            {post.image && (
                <CardMedia
                    component="img"
                    height="300"
                    image={post.image}
                    alt="Post image"
                    sx={{ objectFit: 'contain', backgroundColor: '#f0f0f0' }}
                />
            )}

            <CardContent>
                <Typography variant="body1" color="text.primary">
                    {post.text}
                </Typography>
            </CardContent>

            <Divider />

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleLike} disabled={!user}>
                    {isLiked ? <Favorite sx={{ color: red[500] }} /> : <FavoriteBorder />}
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                    {likes.length} Likes
                </Typography>

                <IconButton aria-label="comment" sx={{ ml: 2 }} onClick={() => setShowComments(!showComments)}>
                    <Comment />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                    {comments.length} Comments
                </Typography>
            </CardActions>

            {/* Comment Section (Only shows when clicked) */}
            {showComments && (
                <Box sx={{ p: 2, bgcolor: '#fafafa' }}>
                    {comments.map((comment, index) => (
                        <Box key={index} sx={{ mb: 1, p: 1, bgcolor: 'white', borderRadius: 1 }}>
                            <Typography variant="subtitle2" component="span" fontWeight="bold">
                                {comment.user?.username || 'User'}:
                            </Typography>
                            <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                {comment.text}
                            </Typography>
                        </Box>
                    ))}

                    {user && (
                        <Box component="form" onSubmit={handleComment} sx={{ display: 'flex', mt: 2 }}>
                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <Button type="submit" variant="contained" size="small" sx={{ ml: 1 }}>
                                Post
                            </Button>
                        </Box>
                    )}
                </Box>
            )}
        </Card>
    );
};

export default PostCard;