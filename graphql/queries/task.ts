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
            userId{
                id
                email
                name
            }
        }
    }
  }
`;