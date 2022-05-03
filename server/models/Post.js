const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: 'You must have a title.',
            minlength: 1,
            maxlength: 50,
            trim: true
        },
        plantType: {
            type: String,
            required: 'You must have a plant type.',
            trim: true
        },
        description: {
            type: String,
            required: 'You must have a description.',
            minlength: 1,
            maxlength: 400,
            trim: true
        },
        picture: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        comments: [commentSchema] // sub document 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;