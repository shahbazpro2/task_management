import MainCard from '../components/MainCard'

const Completed = ({ data, taskLoading }: any) => {
    return (
        <div>
            <MainCard title='Completed' data={data} taskLoading={taskLoading} />
        </div>
    )
}

export default Completed
