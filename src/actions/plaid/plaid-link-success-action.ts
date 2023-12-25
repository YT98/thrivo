'use server';

import { PlaidService } from "@/services";
import AccessTokenService from "@/services/prisma/access-token-service";
import InstitutionService from "@/services/prisma/institution-service";
import PlaidAccountService from "@/services/prisma/plaid-account-service";
import { ActionResponse } from "@/types";
import { AccessToken, PlaidInstitution } from "@prisma/client";
import { PlaidAccount, PlaidLinkOnSuccessMetadata } from "react-plaid-link";

async function exchangeAccessToken(publicToken: string): Promise<string> {
    const plaidService = new PlaidService();
    plaidService.setClient(plaidService.initializePlaidClient());
    const accessToken = await plaidService.exchangePublicToken(publicToken);
    return accessToken;
}

async function createAccessTokenRecord(accessToken: string): Promise<AccessToken> {
    const accessTokenService = new AccessTokenService();
    return await accessTokenService.create({token: accessToken});
}

async function getInstitutionRecord(plaidInstitutionId: string): Promise<PlaidInstitution | null> {
    const institutionService = new InstitutionService();
    const institutionRecord = await institutionService.getInstitutionByPlaidId(plaidInstitutionId);
    return institutionRecord;
}

async function createInstitutionRecord(plaidInstitutionId: string, name: string): Promise<PlaidInstitution> {
    const institutionService = new InstitutionService();
    return await institutionService.create({
        name: name,
        plaidInstitutionId: plaidInstitutionId,
    });
}

async function createAccountRecord(plaidInstitution: PlaidInstitution, account: PlaidAccount, accessTokenRecord: AccessToken): Promise<PlaidInstitution> {
    const plaidAccountService = new PlaidAccountService();
    return await plaidAccountService.createWithInstitution({
        name: account.name,
        mask: account.mask,
        type: account.type,
        subtype: account.subtype,
        plaidAccountId: account.id,
        verificationStatus: account.verification_status,
        plaidInstitution: {
            connect: {
                id: plaidInstitution.id
            }
        },
        accessToken: {
            connect: {
                id: accessTokenRecord.id
            }
        }
    });
}


export default async function plaidLinkSuccessAction(publicToken: string, metadata: PlaidLinkOnSuccessMetadata): Promise<ActionResponse> {
    try {
        const accessToken = await exchangeAccessToken(publicToken);
        const accessTokenRecord = await createAccessTokenRecord(accessToken);

        if (metadata.institution === null ) {
            throw new Error("Institution is null");
        }
        let institutionRecord = await getInstitutionRecord(metadata.institution.institution_id);
        if (institutionRecord === null) {
            institutionRecord = await createInstitutionRecord(metadata.institution.institution_id, metadata.institution.name);
        }

        for (const account of metadata.accounts) {
            console.log("Creating account record for account", account)
            const accountRecord = await createAccountRecord(institutionRecord, account, accessTokenRecord);
            console.log("Created account record", accountRecord);
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