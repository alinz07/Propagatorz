const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        posts: [Post]
    }

    type Post {
        _id: ID
        title: String
        plantType: String
        description: String
        picture: String
        createdAt: String
        username: String
        commentCount: Int
        comments: [Comment]
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        posts(username: String): [Post]
        post(_id: ID!): Post
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(
            title: String!
            plantType: String!
            description: String!
            picture: String!
        ): Post
        addComment(postId: ID!, commentBody: String!): Post
        deletePost(_id: ID!): Post
        updatePost(
            postId: ID!
            title: String
            plantType: String
            description: String
        ): Post
    }
`;

module.exports = typeDefs;

// deletePost(_id: String!): Post
