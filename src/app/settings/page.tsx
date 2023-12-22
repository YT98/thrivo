import PlaidLinkWrapper from "@/components/plaid/plaid-link-wrapper";
import { PlaidService } from "@/services/plaid/plaid-service";
import { LinkTokenCreateResponse } from "plaid";

async function getLinkTokenData(): Promise<LinkTokenCreateResponse> {
    const plaidService = new PlaidService();
    plaidService.setClient(plaidService.initializePlaidClient());
    const linkTokenData = await plaidService.generateLinkToken();
    return linkTokenData;
}

const SettingsPage = async () => {

    const linkTokenData = await getLinkTokenData();

    return (
        <div>
            <h1>Settings</h1>
            <PlaidLinkWrapper linkToken={linkTokenData} />
        </div>
    );
};

export default SettingsPage;
export { SettingsPage };