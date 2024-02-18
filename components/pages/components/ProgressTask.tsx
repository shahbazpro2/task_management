"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressTask() {
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return <>
        <div className="flex gap-2 items-center">
            <div className="text-base">50%</div>
            <Progress value={progress} className="w-full" />
        </div>
    </>
}
