import { Label } from '@/components/ui/label'
import { AddMemberMutation, DeleteMemberMutation } from '@/graphql/mutations/members'
import { GetTask } from '@/graphql/queries/task'
import { GetUsers } from '@/graphql/queries/users'
import { useMutation, useQuery } from '@apollo/client'
import Multiselect from 'multiselect-react-dropdown'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface Props {
    taskId: string
    members: any
}

const Members = ({ taskId, members }: Props) => {
    const { data: users, loading: usersLoading } = useQuery(GetUsers)
    const [addMember, { error }] = useMutation(AddMemberMutation, { refetchQueries: [GetTask] })
    const [delMember, { error: delError }] = useMutation(DeleteMemberMutation, { refetchQueries: [GetTask] })

    useEffect(() => {
        if (error || delError) {
            toast.error(error?.message || delError?.message)
        }
    }, [error, delError])

    const onSelectMember = (_: any, selectedItem: any) => {
        console.log('params', selectedItem)
        addMember(
            { variables: { taskId, userId: selectedItem?.id } }
        )
    }

    const onRemoveMember = (_: any, selectedItem: any) => {
        delMember(
            { variables: { taskId, userId: selectedItem?.id } }
        )
    }

    return (
        <>
            <Label htmlFor="members">Members</Label>
            <Multiselect
                options={users?.getUsers}
                selectedValues={members}
                onSelect={onSelectMember}
                onRemove={onRemoveMember}
                displayValue="email"
            />
        </>
    )
}

export default Members
