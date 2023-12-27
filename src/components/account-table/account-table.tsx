import { usePlaidAccountsWithInstitution } from "@/hooks/accounts"

const AccountTable = async () => {
    const accounts = await usePlaidAccountsWithInstitution();

    const accountRows = accounts.map((account, index) => (
        <tr key={index}>
            <th></th>
            <th> {account.name} </th>
            <th> {account.type} </th>
            <th> {account.plaidInstitution.name} </th>
            <th> {account.createdAt.toDateString()} </th>
            <th> {account.updatedAt.toDateString()} </th>
        </tr>
    ))

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Bank</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                </tr>
                </thead>
                <tbody> {accountRows} </tbody>
            </table>
        </div>
    )
}

export default AccountTable;
export { AccountTable };