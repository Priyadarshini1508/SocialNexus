const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Get all posts (The Feed)
// @route   GET /api/posts
const getPosts = async (req, res) => {
    try {
        // Get posts and sort by newest first (-1)
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('user', 'username') // Add the username of the poster
            .populate('comments.user', 'username'); // Add usernames to comments
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new post
// @route   POST /api/posts
const createPost = async (req, res) => {
    if (!req.body.text && !req.body.image) {
        return res.status(400).json({ message: 'Post must have text or image' });
    }

    try {
        const post = await Post.create({
            user: req.user.id, // We will get this from the token later
            text: req.body.text,
            image: req.body.image
        });

        // Return the full post with user details
        const fullPost = await Post.findById(post._id).populate('user', 'username');
        res.status(200).json(fullPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Like or Unlike a post
// @route   PUT /api/posts/:id/like
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if post is already liked by this user
        if (post.likes.includes(req.user.id)) {
            // Unlike: Remove user ID from likes array
            post.likes = post.likes.filter(id => id.toString() !== req.user.id);
        } else {
            // Like: Add user ID to likes array
            post.likes.push(req.user.id);
        }

        await post.save();
        res.status(200).json(post.likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a comment
// @route   POST /api/posts/:id/comment
const commentPost = async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ message: 'Comment text is required' });
    }

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = {
            user: req.user.id,
            text: req.body.text,
            createdAt: new Date()
        };

        post.comments.push(comment);
        await post.save();

        // Re-fetch post to return populated comments
        const updatedPost = await Post.findById(req.params.id)
            .populate('comments.user', 'username');

        res.status(200).json(updatedPost.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPosts, createPost, likePost, commentPost };