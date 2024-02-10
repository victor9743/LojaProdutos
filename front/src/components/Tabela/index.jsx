export const Table = ({thead, tbody }) => {
    return (
        <table className="table table-bordered table-striped table-hover mt-3" >
            <thead>
                { thead }
            </thead>
            <tbody>
                { tbody }
            </tbody>
        </table>
    )
}