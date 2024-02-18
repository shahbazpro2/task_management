import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { ProgressTask } from './ProgressTask'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GetSubTasks } from '@/graphql/queries/subtask'
import { CreateSubTaskMutation } from '@/graphql/mutations/subtask'
import { toast } from 'react-toastify'
import { useUserAtom } from '@/jotai/authdata'
import SubTask from './SubTask'

interface SubTaskInputProps {
    taskId: string
}

const SubTaskInput = ({ taskId }: SubTaskInputProps) => {
    const [addSubTask, { data, loading, error }] = useMutation(CreateSubTaskMutation, { refetchQueries: [GetSubTasks] });
    const [showTaskInput, setShowTaskInput] = useState(false)
    const [subTask, setSubTask] = useState('')

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    const onAddSubTask = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await addSubTask({ variables: { taskId, title: subTask } })
        if (res) {
            setSubTask('')
            setShowTaskInput(false)
        }
        console.log('subTask', subTask)
    }

    return (
        <>
            <div className="flex justify-end mt-2">
                <Button size="sm" variant="outline" onClick={() => setShowTaskInput(!showTaskInput)}>
                    <Plus className="size-5 mr-1" />
                    Add Sub Task</Button>
            </div>
            {
                showTaskInput &&
                <form onSubmit={onAddSubTask}>
                    <div className="flex items-center gap-3 mt-2">
                        <Input required value={subTask} onChange={e => setSubTask(e.target.value)} />
                        <Button disabled={loading} size="sm" variant="outline" className="!bg-green-600">
                            {
                                loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Add</Button>
                    </div>
                </form>
            }
        </>
    )

}

interface Props {
    taskId: string
}

const SubTasks = ({ taskId }: Props) => {
    const [getSubTasks, { data, loading }] = useLazyQuery(GetSubTasks)

    useEffect(() => {
        getSubTasks({ variables: { taskId } })
    }, [taskId])

    const { getSubTasks: subTasks } = data || {}
    return (
        <>
            <SubTaskInput taskId={taskId} />
            {
                subTasks?.length > 0 &&
                <div className="bg-gray-900 px-5 py-3 rounded mt-3">
                    <ProgressTask subTasks={subTasks} />
                    <div className="mt-3 max-h-[800px] overflow-auto">
                        {
                            subTasks?.map((task: any) => {
                                return <SubTask key={task.id} task={task} />
                            })
                        }

                    </div>
                </div>
            }
        </>
    )
}

export default SubTasks
