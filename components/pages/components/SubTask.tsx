import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { deleteSubTaskMutation, updateSubTaskMutation } from '@/graphql/mutations/subtask'
import { GetSubTasks } from '@/graphql/queries/subtask'
import { useMutation } from '@apollo/client'
import { Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const SubTask = ({ task }: any) => {
    const [updateSubTask, { data, loading, error }] = useMutation(updateSubTaskMutation, { refetchQueries: [GetSubTasks] });
    const [delSubTask, { loading: delLoading, error: delError }] = useMutation(deleteSubTaskMutation, { refetchQueries: [GetSubTasks] });
    const [title, setTitle] = useState(task?.title)
    const [status, setStatus] = useState(task?.status)

    useEffect(() => {
        if (error || delError) {
            toast.error(error?.message || delError?.message)
        }
    }, [error, delError])

    const onUpdate = () => {
        if (!title || title === task.title) return
        updateSubTask({ variables: { id: task.id, title } })
        console.log('update', title)
    }

    const onRemove = () => {
        const confirm = window.confirm('Are you sure you want to delete this sub task?')
        if (confirm) {
            delSubTask({ variables: { id: task.id } })
        }
    }

    const onChangeStatus = (checked: boolean) => {
        setStatus(checked ? 'completed' : 'todo')
        if (checked) {
            updateSubTask({ variables: { id: task.id, title, status: 'completed' } })
        } else {
            updateSubTask({ variables: { id: task.id, title, status: 'todo' } })
        }
    }

    return (
        <div className="flex items-center justify-between gap-2 py-2">
            <div className="flex gap-2 w-full items-center">
                <Checkbox checked={status === 'completed'} onCheckedChange={onChangeStatus} />
                <Input value={title} onChange={e => setTitle(e.target.value)} onBlur={onUpdate} />
            </div>
            <div>
                <Trash2 className="size-5 text-gray-400 cursor-pointer" onClick={onRemove} />
            </div>
        </div>
    )
}

export default SubTask
