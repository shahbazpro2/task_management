'use client'

import Completed from "./Completed"
import InProgress from "./InProgress"
import Todo from "./Todo"

const Home = () => {

    return (
        <div className='p-10 flex gap-7'>
            <Todo />
            <InProgress />
            <Completed />

        </div>
    )
}

export default Home
