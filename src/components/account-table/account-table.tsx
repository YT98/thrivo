'use client';

import { AccountWithInstitution } from "@/services/prisma/plaid-account-service";
import { useState } from "react";
import AccountTableRow from "./account-table-row";

interface AccountTableProps {
    accounts: AccountWithInstitution[];
}

const AccountTable = (props: AccountTableProps) => {

    const { accounts } = props;

    const accountRows = accounts.map((account, index) => <AccountTableRow key={index} account={account} />);

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
                    <th></th>
                </tr>
                </thead>
                <tbody> {accountRows} </tbody>
            </table>
        </div>
    )
}

export default AccountTable;
export { AccountTable };