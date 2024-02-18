'use client'

import { useUserAtom } from "@/jotai/authdata"
import Completed from "./Completed"
import InProgress from "./InProgress"
import Todo from "./Todo"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useLazyQuery, useQuery } from "@apollo/client"
import { GetTasks } from "@/graphql/queries/task"
import TaskDetailModal from "../components/TaskDetailModal"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GetUsers } from "@/graphql/queries/users"
import { Label } from "@/components/ui/label"

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
    const { data: users, loading: usersLoading } = useQuery(GetUsers)
    const [formattedData, setFormattedData] = useState<formattedData>(initialData)
    const [selectedUser, setSelectedUser] = useState('')

    useEffect(() => {
        if (data?.getTasks) {
            const originalData = [...data.getTasks]
            let modifiedData = JSON.parse(JSON.stringify(initialData))
            originalData.forEach((task: any) => {
                if (task.status === 'todo') {
                    modifiedData.todo.push(task)
                } else if (task.status === 'inprogress') {
                    modifiedData.inprogress.push(task)
                } else if (task.status === 'completed') {
                    modifiedData.completed.push(task)
                }
            })

            setFormattedData({ ...modifiedData })
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

    const onFilterChange = (val: string) => {
        setSelectedUser(val)
        getTasks({ variables: { userId: val } })
    }

    if (loading) return <div>Loading...</div>

    return (
        <>
            <div className="flex justify-start mt-4 px-5">
                <div className="w-[200] space-y-1">
                    <Label htmlFor="filter">Filter By User</Label>
                    <Select value={selectedUser || user?.id} onValueChange={onFilterChange}  >
                        <SelectTrigger>
                            <SelectValue placeholder="Select User to filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    users?.getUsers?.map((user: any) => {

                                        return <SelectItem key={user?.id} value={user?.id}>{user?.email}</SelectItem>
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='p-10 flex gap-7'>
                <Todo data={formattedData?.todo} taskLoading={taskLoading} />
                <InProgress data={formattedData?.inprogress} taskLoading={taskLoading} />
                <Completed data={formattedData?.completed} taskLoading={taskLoading} />

                <TaskDetailModal />
            </div>
        </>
    )
}

export default Home
