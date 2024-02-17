import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Task from './Task'

interface Props {
    title: string
    footer?: React.ReactNode
}

const MainCard = ({ footer, title }: Props) => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 max-h-[75vh] overflow-auto mb-3'>
                <Task />
                <Task />
                <Task />
            </CardContent>
            {footer}
        </Card>
    )
}

export default MainCard
