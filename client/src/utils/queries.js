import { gql } from "@apollo/client";

export const QUERY_ALL_POSTS = gql`
    query getPosts($username: String) {
        posts(username: $username) {
            _id
            title
            plantType
            description
            picture
            createdAt
            username
            commentCount
            comments {
                commentBody
                username
                createdAt
                _id
            }
        }
    }
`;

export const QUERY_ONE_POST = gql`
    query getPost($_id: ID!) {
        post(_id: $_id) {
            title
            plantType
            description
            picture
            createdAt
            username
            commentCount
            comments {
                commentBody
                username
                createdAt
                _id
            }
        }
    }
`;

export const QUERY_ALL_USERS = gql`
    {
        users {
            _id
            username
            email
            posts {
                _id
                plantType
                title
                description
                picture
                createdAt
                commentCount
                comments {
                    _id
                    commentBody
                    username
                    createdAt
                }
            }
        }
    }
`;

export const QUERY_ONE_USER = gql`
    User($username: String!) {
        user(username: $username) {
            _id
            email
            posts {
                _id
                title
                plantType
                description
                picture
                createdAt
                commentCount
                comments {
                    _id
                    commentBody
                    createdAt
                    username
                }
            }
        }
    }
`;

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            posts {
                _id
                title
                plantType
                description
                picture
                createdAt
                commentCount
                comments {
                    _id
                    commentBody
                    username
                    createdAt
                }
            }
        }
    }
`;
