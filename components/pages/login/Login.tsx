import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const Login = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="border border-gray-500 rounded-lg w-[90%] lg:w-[30%] px-4 py-5">
                <div className="text-2xl text-center">Login</div>
                <div className='space-y-3 mt-5'>
                    <div className='space-y-2'>
                        <Label htmlFor="email">Email</Label>
                        <Input />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="email">Password</Label>
                        <Input type="password" />
                    </div>
                </div>
                <Button className='w-full mt-7'>Login</Button>
            </div>
        </div>
    )
}

export default Login
