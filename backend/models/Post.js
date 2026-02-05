const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links this post to a specific User
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String // We will store the image URL here
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // List of users who liked this post
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);