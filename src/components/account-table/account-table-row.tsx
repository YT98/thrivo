import { editAccountAction } from "@/actions";
import { AccountWithInstitution } from "@/services/prisma/plaid-account-service";
import { useState } from "react";

interface AccountTableRowProps {
    account: AccountWithInstitution;
}

const AccountTableRow = (props: AccountTableRowProps) => {
    const { account } = props;

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [accountName, setAccountName] = useState<string>(account.name);

    const handleSaveAccount = async (accountId: string) => {
        const editAccountActionResponse = await editAccountAction(accountId, accountName);
        // TODO: Handle response
        setIsEditMode(false);
    }

    if (isEditMode) return (
        <tr>
            <th></th>
            <th> <input type="text" value={accountName} onChange={e => setAccountName(e.target.value)} className="input input-bordered input-sm w-full max-w-xs" /> </th>
            <th> {account.subtype} </th>
            <th> {account.plaidInstitution.name} </th>
            <th> {account.createdAt.toDateString()} </th>
            <th>
                <button onClick={() => handleSaveAccount(account.id)} className="btn btn-success btn-xs mr-2">Save</button>
                <button onClick={() => setIsEditMode(false)} className="btn btn-error btn-xs">Cancel</button>
            </th>
        </tr>
    )

    return (
        <tr>
            <th></th>
            <th> {accountName} </th>
            <th> {account.subtype} </th>
            <th> {account.plaidInstitution.name} </th>
            <th> {account.createdAt.toDateString()} </th>
            <th>
                <button onClick={() => setIsEditMode(true)} className="">...</button>
            </th>
        </tr>
    )
}

export default AccountTableRow;
export { AccountTableRow };