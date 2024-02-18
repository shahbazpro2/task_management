import { gql } from "@apollo/client";

export const GetSubTasks = gql`
  query getSubTasks($taskId: String!) {
    getSubTasks(taskId: $taskId) {
        id
        title
        status
        dueDate
    }
  }
`;