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

export const UpdateTaskMutation = gql`
    mutation updateTask($id:String!,$title:String!,$content:String, $status: String, $dueDate: String) {
        updateTask(id:$id,updateTask:{title:$title, status:$status,content:$content, dueDate:$dueDate}) {
            id
            title
            content
            status
            dueDate
        }
    }
    `;