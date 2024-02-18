import { gql } from "@apollo/client";

export const CreateTaskMutation = gql`
  mutation CreateTask($title: String!, $creatorId: String!) {
    createTask(createTask:{title:$title,creatorId:$creatorId}) {
        id
        title
        status
        dueDate
    }
  }
`;