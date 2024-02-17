import React from 'react'
import MainCard from '../components/MainCard'
import TaskFooter from '../components/TaskFooter'

const Todo = () => {
    return (
        <div>
            <MainCard title='Todo' footer={<TaskFooter />} />
        </div>
    )
}

export default Todo
