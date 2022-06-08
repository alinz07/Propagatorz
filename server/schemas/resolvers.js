const { User, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
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
                const updatedPost = await Post.findByIdAndUpdate(
                    { _id: postId },
                    {
                        $push: {
                            comments: {
                                username: context.user.username,
                                commentBody: commentBody,
                            },
                        },
                    },
                    { new: true }
                );
                return updatedPost;
            }

            throw new AuthenticationError("You need to be logged in.");
        },
        deletePost: async (parent, { _id }) => {
            return Post.findByIdAndDelete({ _id });
        },
        updatePost: async (
            parent,
            { postId, title, plantType, description },
            context
        ) => {
            if (context.user) {
                console.log(postId, title, description, plantType);
                const argsNoIdObj = { title, description, plantType };
                const updatedPost = await Post.findByIdAndUpdate(
                    { _id: postId },
                    { ...argsNoIdObj },
                    { new: true }
                );
                return updatedPost;
            }

            throw new AuthenticationError("You need to be logged in.");
        },
    },
};

module.exports = resolvers;
