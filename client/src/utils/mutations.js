import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser(
        $username: String!
        $email: String!
        $password: String!
    ) {
        updateUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                password
            }
        }
    }
`;

export const DELETE_USER = gql`
    mutation ($_id: Int) {
        deleteUser(where: { id: { _eq: $id } }) {
            affected_rows
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost(
        $title: String!
        $plantType: String!
        $description: String!
        $picture: String!
    ) {
        addPost(
            title: $title
            plantType: $plantType
            description: $description
            picture: $picture
        ) {
            _id
            title
            plantType
            description
            picture
            createdAt
            username
        }
    }
`;

export const UPDATE_POST = gql`
    mutation updatePost(
        $postId: ID!
        $title: String
        $plantType: String
        $description: String
    ) {
        updatePost(
            postId: $postId
            title: $title
            plantType: $plantType
            description: $description
        ) {
            _id
            title
            plantType
            decription
            picture
            createdAt
            username
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($_id: ID!) {
        deletePost(_id: $_id) {
            _id
            username
            createdAt
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($postId: ID!, $commentBody: String!) {
        addComment(postId: $postId, commentBody: $commentBody) {
            _id
            title
            commentCount
            comments {
                _id
                commentBody
            }
        }
    }
`;

export const UPDATE_COMMENT = gql`
    mutation updateComment($post: Int) {
        updateComment(comment: $comment, description: $description) {
            token
            comment {
                _id
                description
            }
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation ($comment: String!, $description: String!) {
        deleteComment(where: { comment: { _eq: $comment } }) {
            affected_rows
        }
    }
`;
