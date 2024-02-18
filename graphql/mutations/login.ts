import { gql } from "@apollo/client";

export const LoginMutation = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        id
        email
    }
  }
`;