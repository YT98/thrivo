'use server';

import { PlaidService } from "@/services";
import { AccessTokenService } from "@/services/prisma";
import { InstitutionService } from "@/services/prisma/institution-service";
import { ActionResponse } from "@/types";
import { AccessToken, PlaidInstitution, Prisma } from "@prisma/client";
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

async function exchangeAccessToken(publicToken: string): Promise<string> {
    const plaidService = new PlaidService();
    plaidService.setClient(plaidService.initializePlaidClient());
    const accessToken = await plaidService.exchangePublicToken(publicToken);
    return accessToken;
}

async function createAccessTokenRecord(accessToken: string): Promise<AccessToken> {
    const accessTokenService = new AccessTokenService();
    accessTokenService.connect();
    return await accessTokenService.create({token: accessToken});
}

async function getInstitutionRecord(plaidInstitutionId: string): Promise<PlaidInstitution | null> {
    const institutionService = new InstitutionService();
    institutionService.connect();
    const institutionRecord = await institutionService.getInstitutionByPlaidId(plaidInstitutionId);
    return institutionRecord;
}

async function createInstitutionRecord(plaidInstitutionId: string, name: string): Promise<PlaidInstitution> {
    const institutionService = new InstitutionService();
    institutionService.connect();
    return await institutionService.create({
        name: name,
        plaidInstitutionId: plaidInstitutionId,
    });
}

export default async function plaidLinkSuccessAction(publicToken: string, metadata: PlaidLinkOnSuccessMetadata): Promise<ActionResponse> {
    try {
        const accessToken = await exchangeAccessToken(publicToken);
        const accessTokenRecord = await createAccessTokenRecord(accessToken);

        if (metadata.institution !== null) {
            let institutionRecord = await getInstitutionRecord(metadata.institution.institution_id);
            if (institutionRecord === null) {
                institutionRecord = await createInstitutionRecord(metadata.institution.institution_id, metadata.institution.name);
            }
        }



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