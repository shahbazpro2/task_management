import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { CreateTaskMutation } from '@/graphql/mutations/task'
import { GetTasks } from '@/graphql/queries/task'
import { useUserAtom } from '@/jotai/authdata'
import { useMutation } from '@apollo/client'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const TaskFooter = () => {
    const [showTaskInput, setShowTaskInput] = useState(false)
    const [addTodo, { data, loading, error }] = useMutation(CreateTaskMutation, { refetchQueries: [GetTasks] });
    const user = useUserAtom()

    useEffect(() => {
        if (error) {
            console.log('error', error.message)
            toast.error(error.message)
        }
    }, [error])

    const onClickAddTask = () => {
        setShowTaskInput(true)
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const title = (e.target as HTMLFormElement).title.value
        const res = await addTodo({
            variables: { title, creatorId: user?.id }
        });

        if (res.data?.createTask) {
            setShowTaskInput(false)
        }

    }


    return (
        <CardFooter className="flex justify-between">
            {
                showTaskInput ?
                    <Card className='w-full'>
                        <div className='flex justify-end p-3'>
                            <svg onClick={() => setShowTaskInput(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <CardContent className='px-3'>
                            <form onSubmit={onSubmit}>
                                <Textarea name="title" required placeholder="Add Task Title" className='resize-none' rows={3} />
                                <div className="flex items-center gap-2 py-2 mt-2">
                                    <Button disabled={loading} size="sm" className='px-7'>
                                        {
                                            loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        }
                                        Add</Button>

                                </div>
                            </form>
                        </CardContent>
                    </Card> :
                    <Button size="sm" className='w-full' onClick={onClickAddTask}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add Task</Button>
            }
        </CardFooter>
    )
}

export default TaskFooter
