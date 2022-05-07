import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login( $username: String!, $email: String!, $password: String!) {
      login(useranme: $username, email: $email, password: $password) {
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
      updateUser(
        username: $username
        email: $email
        password: $password
      ) {
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
    deleteUser (
      where: {
        id: {
          _eq: $id
        }
      }
    ) {
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
      $createdAt: Date!
      $username: String!
    ) {
        addPost(
            title: $title
            plantType: $plantType
            description: $description
            picture: $picture
            createdAt: $createdAt
            username: $username
        ) {
            token
            user {
              _id
            }
        }
    }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
      $title: String!
      $plantType: String!
      $description: String!
      $picture: String!
      $createdAt: Date!
      $username: String!
    ) {
        updatePost(
            title: $title
            plantType: $plantType
            description: $description
            picture: $picture
            createdAt: $createdAt
            username: $username
        ) {
            token
            Post {
              title
              plantType
              decription
              picture
              createdAt
              username
            }
        }
    }
`;

export const DELETE_POST = gql`
  mutation ($title: String!, plantType: String!) {
    deletePost (
      where: {
        id: {
          _eq: $id
        }
      }
    ) {
      affected_rows
    }
  }  
`;

export const ADD_COMMENT = gql`
  mutation addComment(
      $post.id: Int
    ) {
        addComment(
            comment: $comment
            description: $description
        ) {
            token
            post.comment {
              _id
              description
            }
        }
    }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment(
      $post.comment.id: Int
    ) {
        updateComment(
            comment.id: $comment.id
            description: $description
        ) {
            token
            post.comment {
              _id
              description
            }
        }
    }
`;

export const DELETE_COMMENT = gql`
  mutation ($post.comment.id: Int, $description: String!) {
    deleteComment (
      where: {
        post.comment.id: {
          _eq: $post.commnet.id
        }
      }
    ) {
      affected_rows
    }
  }  
`;