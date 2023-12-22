'use server';

import { PlaidService } from "@/services";
import { AccessTokenService } from "@/services/prisma";
import { ActionResponse } from "@/types";
import { PrismaClient } from "@prisma/client";

async function exchangeAccessToken(publicToken: string): Promise<string> {
    const plaidService = new PlaidService();
    plaidService.setClient(plaidService.initializePlaidClient());
    const accessToken = await plaidService.exchangePublicToken(publicToken);
    return accessToken;
}

async function storeAccessToken(accessToken: string): Promise<void> {
    const accessTokenService = new AccessTokenService();
    accessTokenService.connect();
    await accessTokenService.createAccessToken(accessToken);
}

export default async function plaidLinkSuccessAction(publicToken: string): Promise<ActionResponse> {
    try {
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