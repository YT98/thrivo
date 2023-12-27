import AccountTable from "@/components/account-table/account-table";
import Header from "@/components/header/header";
import PlaidLinkWrapper from "@/components/plaid/plaid-link-wrapper";
import { usePlaidAccountsWithInstitution } from "@/hooks/accounts";
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
    const accountsWithInstitution = await usePlaidAccountsWithInstitution();

    return (
        <div className="container py-20 px-10">
            <Header title="Settings" />
            <div className="container mx-auto">
                <h2> Your Accounts </h2>
                <AccountTable accounts={accountsWithInstitution}/>
                <div className="pt-5">
                    <PlaidLinkWrapper buttonLabel="Add a bank account" linkToken={linkTokenData} />
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
export { SettingsPage };