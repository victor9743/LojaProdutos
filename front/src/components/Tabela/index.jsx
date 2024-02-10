import './style.css'
export const Table = ({thead, tbody }) => {
    return (
        <div className='table-responsive-sm'>
            <table className="table table-bordered table-striped table-hover mt-3" >
                <thead>
                    { thead }
                </thead>
                <tbody>
                    { tbody }
                </tbody>
            </table>
        </div>
    )
}