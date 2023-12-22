'use server';

import { PlaidService } from "@/services";
import { ActionResponse } from "@/types";

async function exchangeAccessToken(publicToken: string): Promise<string> {
    const plaidService = new PlaidService();
    plaidService.setClient(plaidService.initializePlaidClient());
    const accessToken = await plaidService.exchangePublicToken(publicToken);
    return accessToken;
}

async function storeAccessToken(accessToken: string): Promise<void> {
    // TODO: Store access token in database
    console.log(accessToken);
}

export default async function plaidLinkSuccessAction(publicToken: string): Promise<ActionResponse> {
    try {
        console.log("plaidLinkSuccessAction")
        const accessToken = await exchangeAccessToken(publicToken);
        storeAccessToken(accessToken);
        return {
            status: 200,
            message: "Successfully exchanged public token for access token",
        };
    } catch(error) {
        return {
            status: 500,
            message: "Error exchanging public token for access token",
        }
    }
}