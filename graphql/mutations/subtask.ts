import { gql } from "@apollo/client";

export const CreateSubTaskMutation = gql`
  mutation CreateSubTask($taskId:String!, $title: String!) {
    createSubTask(createSubTask:{taskId:$taskId, title:$title}) {
        id
        title
        status
    }
  }
`;

export const updateSubTaskMutation = gql`
    mutation updateSubTask($id:String!,$title:String!, $status: String) {
        updateSubTask(subTaskId:$id,updateSubTask:{title:$title, status:$status}) {
            id
            title
            status
        }
    }
    `;

export const deleteSubTaskMutation = gql`
    mutation deleteSubTask($id:String!) {
        deleteSubTask(subTaskId:$id) {
            id
        }
    }
    `;