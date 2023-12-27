"use server"
import PlaidAccountService from "@/services/prisma/plaid-account-service";
import { ActionResponse } from "@/types";
import { PlaidAccount } from "@prisma/client";

async function updateAccount(accountId: string, accountName: string): Promise<PlaidAccount> {
    const plaidAccountService = new PlaidAccountService();
    return await plaidAccountService.updateAccountName(accountId, accountName);
}

export async function editAccountAction(accountId: string, accountName: string): Promise<ActionResponse> {
    try {
        const updateAccountRes = updateAccount(accountId, accountName);
        return {
            status: 200,
            message: "Successfully updated account name.",
        };

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: "Error editing account. Please try again.",
        }
    }
}