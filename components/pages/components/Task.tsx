import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

const Task = () => {
    return (
        <div className="bg-slate-900 border border-gray-800 p-4 rounded-lg">
            <div>test</div>
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
