import { gql } from '@apollo/client';

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
  mutation addUser(
      $username: String!
      $email: String!
      $password: String!
    ) {
        addUser(
            userName: $userName
            email: $email
            password: $password
        ) {
            token
            user {
              _id
            }
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