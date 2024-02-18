import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useOpenCloseModal } from '@/jotai/modal'
import { taskDetailModal } from './TaskDetailModal'

interface Props {
    data: any
}

const Task = ({ data }: Props) => {
    const openCloseModal = useOpenCloseModal()

    return (
        <div className="bg-slate-900 border border-gray-800 p-4 rounded-lg cursor-pointer" onClick={() => openCloseModal({
            key: taskDetailModal,
            status: true
        })}>
            <div>{data?.title}</div>
            <div className='flex justify-end items-center mt-2'>
                <Avatar className='size-7'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default Task
