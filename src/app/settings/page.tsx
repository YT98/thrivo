import Header from "@/components/header/header";
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
        <div className="container py-20 px-10">
            <Header title="Settings" />
            <div className="container mx-auto">
                <PlaidLinkWrapper linkToken={linkTokenData} />
            </div>
        </div>
    );
};

export default SettingsPage;
export { SettingsPage };