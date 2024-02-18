import MainCard from '../components/MainCard'

const InProgress = ({ data, taskLoading }: any) => {
    return (
        <div>
            <MainCard title='In Progress' data={data} taskLoading={taskLoading} />
        </div>
    )
}

export default InProgress
