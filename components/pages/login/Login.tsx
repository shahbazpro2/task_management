'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginMutation } from '@/graphql/mutations/login'
import { useSetUserAtom } from '@/jotai/authdata'
import { useMutation } from '@apollo/client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
    const [addTodo, { data, loading, error }] = useMutation(LoginMutation);
    const setUser = useSetUserAtom()
    const router = useRouter()

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const res = await addTodo({
            variables: { email, password }
        });

        if (res.data?.loginUser) {
            toast.success('Login successful')
            setUser(res.data.loginUser)
            router.push('/')
            console.log('res', res)
        }
    }

    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <div className="border border-gray-500 rounded-lg w-[90%] lg:w-[30%] px-4 py-5">
                    <form onSubmit={onSubmit}>
                        <div className="text-2xl text-center">Login</div>
                        <div className='space-y-3 mt-5'>
                            <div className='space-y-2'>
                                <Label htmlFor="email">Email</Label>
                                <Input name="email" />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="email">Password</Label>
                                <Input name="password" type="password" />
                            </div>
                        </div>
                        <Button disabled={loading} className='w-full mt-7'>
                            {
                                loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                            }
                            Login</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
