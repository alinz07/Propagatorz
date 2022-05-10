const { User, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const mongoose = require("mongoose");

const resolvers = {
    Query: {
        // get logged in user's JWT token
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-password")
                    .populate("posts");

                return userData;
            }

            throw new AuthenticationError("Not logged in");
        },
        // get all users
        users: async () => {
            return User.find().select("-password").populate("posts");
        },
        // get a single user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select("-password")
                .populate("posts");
        },
        // get all posts with option to get all posts by username
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 }).select("-__v");
        },
        // get a single post by _id
        post: async (parent, { _id }) => {
            return Post.findOne({ _id }).select("-__v");
        },
    },

    Mutation: {
        // create new user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        // log in user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const correctPw = await user.isCorrectPassword({ password });

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);

            return { token, user };
        },
        // create new post
        addPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create({
                    ...args,
                    username: context.user.username,
                });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );

                return post;
            }

            throw new AuthenticationError("You need to be logged in.");
        },
        // create new comment
        addComment: async (parent, { postId, commentBody }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $push: {
                            comments: {
                                commentBody,
                                username: context.user.username,
                            },
                        },
                    },
                    { new: true }
                );

                return updatedPost;
            }

            throw new AuthenticationError("You need to be logged in.");
        },
        // deletePost: async (parent, { _id }, context) => {

        deletePost: async (parent, { _id }) => {
            var postId = await mongoose.Types.ObjectId(_id);
            
            const deletedPost = await Post.findOneAndDelete({ _id: postId });

            return deletedPost;
        },
    },
};

module.exports = resolvers;
