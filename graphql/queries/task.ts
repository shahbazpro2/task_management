import { gql } from "@apollo/client";

export const GetTasks = gql`
  query getTasks($userId: String!) {
    getTasks(userId: $userId) {
        id
        title
        status
        dueDate
        members{
            id
            user{
                id
                email
                name
            }
        }
    }
  }
`;

export const GetTask = gql`
query getTask($id: String!) {
    getTask(id: $id) {
        id
        title
        content
        status
        dueDate
        createdAt
        creator{
          id
          email
        }
        members{
            id
            user{
                id
                email
            }
        }
    }
  }
`