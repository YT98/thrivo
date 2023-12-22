import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from "plaid";
import Service from "../base/service";
import { config } from "@/config/config";

export class PlaidService {
    private plaidConfig?: Configuration;
    private plaidClient?: PlaidApi;

    constructor() {
        this.plaidClient = undefined;
    }

    public setClient(client: PlaidApi) {
        this.plaidClient = client;
    }

    public initializePlaidClient() : PlaidApi{
        try {
            this.plaidConfig = new Configuration({
                basePath: PlaidEnvironments.sandbox,
                baseOptions: {
                    headers: {
                        "PLAID-CLIENT-ID": config.plaidClientId,
                        "PLAID-SECRET": config.plaidSecret,
                        "Plaid-Version": config.plaidVersion,
                    },
                },
            });
            return new PlaidApi(this.plaidConfig);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async generateLinkToken() {
        try {
            const linkTokenConfig = {
                user: {
                    client_user_id: "123-test-user-id",
                },
                client_name: "Plaid Test App",
                language: "en",
                products: [Products.Auth],
                country_codes: [CountryCode.Ca],
                webhook: "https://example.com/webhook",
            };
            const tokenResponse = await this.plaidClient!.linkTokenCreate(linkTokenConfig);
            return tokenResponse.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async exchangePublicToken(publicToken: string): Promise<string> {
        try {
            const tokenResponse = await this.plaidClient!.itemPublicTokenExchange({
                public_token: publicToken,
            });
            if (tokenResponse.data == null || tokenResponse.data.access_token == null) {
                throw new Error("Invalid token response");
            }
            return tokenResponse.data.access_token;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}