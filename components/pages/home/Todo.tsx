import React from 'react'
import MainCard from '../components/MainCard'
import TaskFooter from '../components/TaskFooter'

const Todo = ({ data, taskLoading }: any) => {
    return (
        <div>
            <MainCard title='Todo' data={data} taskLoading={taskLoading} footer={<TaskFooter />} />
        </div>
    )
}

export default Todo
