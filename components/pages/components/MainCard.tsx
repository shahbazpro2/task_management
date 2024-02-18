import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Task from './Task'
import TaskDetailModal from './TaskDetailModal'
import { Loader2 } from 'lucide-react'

interface Props {
    title: string
    data: any[]
    taskLoading?: boolean
    footer?: React.ReactNode

}

const MainCard = ({ footer, title, taskLoading, data }: Props) => {

    return (
        <>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2 max-h-[75vh] overflow-auto mb-3'>
                    {
                        taskLoading ? <Loader2 className="h-8 w-8 animate-spin mx-auto" /> : data?.map((task, i) => <Task key={i} data={task} />)
                    }
                </CardContent>
                {footer}
            </Card>

            <TaskDetailModal />
        </>
    )
}

export default MainCard
