import { gql } from "@apollo/client";

export const AddMemberMutation = gql`
  mutation addMemberToTask($taskId:String!, $userId: String!) {
    addMemberToTask(taskId:$taskId, userId:$userId) {
        id
    }
  }
`;

export const DeleteMemberMutation = gql`
    mutation removeMemberFromTask($taskId:String!, $userId: String!) {
        removeMemberFromTask(taskId:$taskId, userId:$userId) {
            id 
        }
    }
    `;