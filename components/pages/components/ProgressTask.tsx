"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressTask({ subTasks }: any) {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const completed = subTasks?.filter((task: any) => task.status === 'completed')
        console.log('completed', completed)
        const total = subTasks.length
        const percentage = (completed.length / total) * 100
        setProgress(percentage)
    }, [subTasks])


    return <>
        <div className="flex gap-2 items-center">
            <div className="text-base">{progress?.toFixed(2)}%</div>
            <Progress value={progress} className="w-full" />
        </div>
    </>
}
