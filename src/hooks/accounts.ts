import PlaidAccountService from "@/services/prisma/plaid-account-service";

const usePlaidAccountsWithInstitution = async () => {
    const plaidAccountsService = new PlaidAccountService();
    return plaidAccountsService.getAllAccountsWithInstitution();
}

export { usePlaidAccountsWithInstitution };