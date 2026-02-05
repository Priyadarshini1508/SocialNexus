const express = require('express');
const router = express.Router();
const { getPosts, createPost, likePost, commentPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// Get all posts (Public feed)
router.get('/', getPosts);

// Create a post (Protected - must be logged in)
router.post('/', protect, createPost);

// Like a post (Protected)
router.put('/:id/like', protect, likePost);

// Comment on a post (Protected)
router.post('/:id/comment', protect, commentPost);

module.exports = router;