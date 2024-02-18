'use client'

import { useUserAtom } from "@/jotai/authdata"
import Completed from "./Completed"
import InProgress from "./InProgress"
import Todo from "./Todo"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { GetTasks } from "@/graphql/queries/task"

type formattedData = {
    todo: any[],
    inprogress: any[],
    completed: any[]
}

const initialData: formattedData = {
    todo: [],
    inprogress: [],
    completed: []
}

const Home = () => {
    const user = useUserAtom()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [getTasks, { data, loading: taskLoading, error }] = useLazyQuery(GetTasks);
    const [formattedData, setFormattedData] = useState<formattedData>(initialData)

    useEffect(() => {
        console.log('data333', data)
        if (data?.getTasks) {
            const formattedData = data.getTasks.reduce((acc: any, task: any) => {
                if (task.status === 'todo') {
                    acc.todo.push(task)
                } else if (task.status === 'inprogress') {
                    acc.inprogress.push(task)
                } else if (task.status === 'completed') {
                    acc.completed.push(task)
                }
                return acc
            }, initialData)
            setFormattedData({ ...formattedData })
        }
    }, [data])

    useEffect(() => {
        if (!user) {
            router.push('/login')
        } else {
            setLoading(false)
        }
    }, [user])

    useEffect(() => {
        if (user && !loading) {
            getTasks({ variables: { userId: user?.id } })
        }
    }, [user, loading])

    if (loading) return <div>Loading...</div>

    return (
        <div className='p-10 flex gap-7'>
            <Todo data={formattedData?.todo} taskLoading={taskLoading} />
            <InProgress />
            <Completed />

        </div>
    )
}

export default Home
