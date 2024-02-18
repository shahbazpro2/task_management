import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useOpenCloseModal } from '@/jotai/modal'
import { taskDetailModal } from './TaskDetailModal'
import { CalendarDays, Users } from 'lucide-react'
import moment from 'moment'

interface Props {
    data: any
}

const Task = ({ data }: Props) => {
    const openCloseModal = useOpenCloseModal()

    return (
        <div className="bg-slate-900 border border-gray-800 p-4 rounded-lg cursor-pointer" onClick={() => openCloseModal({
            key: taskDetailModal,
            status: true,
            data
        })}>
            <div>{data?.title}</div>
            <div className='flex justify-end items-center mt-2 gap-4 text-gray-400  text-xs'>
                {
                    data?.dueDate &&
                    <div className="flex items-center gap-2">
                        <CalendarDays className='size-4' />
                        {moment(data?.dueDate).format('MMMM Do YYYY')}
                    </div>
                }
                <div className='flex gap-1'>
                    {data?.members?.length}
                    <Users className='size-4' />
                </div>
            </div>
        </div>
    )
}

export default Task
