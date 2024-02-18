import { gql } from "@apollo/client";

export const GetUsers = gql`
  query getUsers{
    getUsers{
       id
       email
    }
  }
`;