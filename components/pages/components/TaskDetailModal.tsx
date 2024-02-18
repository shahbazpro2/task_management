import { DatePicker } from "@/components/ui/datePicker"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UpdateTaskMutation } from "@/graphql/mutations/task"
import { GetTask } from "@/graphql/queries/task"
import { useModalState, useOpenCloseModal } from "@/jotai/modal"
import { useLazyQuery, useMutation } from "@apollo/client"
import { CalendarDays, Loader2, User } from "lucide-react"
import moment from "moment"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Members from "./Members"
import SubTasks from "./SubTasks"

export const taskDetailModal = "taskDetailModal"

const TaskDetailModal = () => {
    const openCloseModal = useOpenCloseModal()
    const modalVal = useModalState(taskDetailModal)
    const [getTask, { data: task, loading: taskLoading, error }] = useLazyQuery(GetTask);
    const [updateTask, { loading, error: updateError }] = useMutation(UpdateTaskMutation, { refetchQueries: [GetTask] });

    const [state, setState] = useState({
        title: '',
        content: '',
        dueDate: new Date(),
        status: 'todo'
    })

    const { status, data } = modalVal || {}
    console.log('detailData', data)

    useEffect(() => {
        if (task?.getTask) {
            setState({
                title: task.getTask.title,
                content: task.getTask.content,
                dueDate: task.getTask.dueDate ? new Date(task.getTask.dueDate) : new Date(),
                status: task.getTask.status
            })
        }
    }, [task])

    useEffect(() => {
        if (error || updateError) {
            toast.error(error?.message || updateError?.message)
        }
    }, [error, updateError])

    useEffect(() => {
        if (status) {
            getTask({ variables: { id: data?.id } })
        }
    }, [status])

    const onClose = () => {
        openCloseModal({
            key: taskDetailModal,
            status: false
        })
    }

    const onUpdate = (name: string, value: string) => {
        const orgData = task?.getTask
        if (value === orgData[name]) return
        updateTask({ variables: { id: orgData.id, title: name == 'title' ? value : title, [name]: value, dueDate: name == 'dueDate' ? moment(value).toISOString() : moment(dueDate).toISOString() } })
        console.log('update', title, dueDate, moment(dueDate).toISOString())
    }



    const { title, content, dueDate, status: taskStatus } = state || {}
    console.log('duedate', dueDate)

    return (
        <Dialog open={status} >
            <DialogContent className="max-w-[95%] lg:max-w-[70%] pt-2 pb-24" >
                {
                    taskLoading ? <Loader2
                        className="h-8 w-8 animate-spin mx-auto" />
                        : <>
                            <div className="flex items-center w-full gap-5">
                                <div className="space-y-2 flex w-full items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>

                                    <Input value={title} onChange={e => setState(prev => ({
                                        ...prev,
                                        title: e.target.value
                                    }))} onBlur={() => onUpdate('title', title)} />
                                </div>
                                <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-[75%]">
                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea id="description" rows={6} value={content || ''} className="resize-none mt-1" onChange={e => setState(prev => ({
                                            ...prev,
                                            content: e.target.value
                                        }))} onBlur={() => onUpdate('content', content)} />
                                        <div className="my-3">
                                            <Members taskId={task?.getTask?.id} members={task?.getTask?.members?.map((member: any) => {
                                                return {
                                                    id: member?.user?.id,
                                                    email: member?.user?.email
                                                }
                                            })} />
                                        </div>
                                    </div>
                                    <SubTasks taskId={task?.getTask?.id} />
                                </div>
                                <div className="w-[25%] pt-8 space-y-2">

                                    {/*  <button className="w-full border border-slate-800 py-2 rounded text-sm" >Members</button> */}
                                    <Select value={taskStatus} onValueChange={val => {
                                        onUpdate('status', val)
                                        setState(prev => ({
                                            ...prev,
                                            status: val
                                        }))
                                    }}  >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="todo">Todo</SelectItem>
                                                <SelectItem value="inprogress">In Progress</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <DatePicker date={dueDate} setDate={(val) => {
                                        onUpdate('dueDate', val)
                                        setState(prev => ({
                                            ...prev,
                                            dueDate: val
                                        }))
                                    }
                                    }
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-900 text-white/70 text-sm rounded-b-lg p-3 absolute w-full bottom-0 mt-3 flex gap-5">
                                <div className="flex gap-2 items-center"><User className="size-5" />Created By: Shahbaz</div>
                                <div className="flex gap-2 items-center"> <CalendarDays className="size-5" />Created: {moment(data?.getTask?.createdAt).format(
                                    'MMMM Do YYYY'
                                )}</div>
                            </div>
                        </>
                }
            </DialogContent>
        </Dialog>

    )
}

export default TaskDetailModal