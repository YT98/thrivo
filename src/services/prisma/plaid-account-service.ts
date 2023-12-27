import { PlaidAccount, Prisma } from "@prisma/client";
import PrismaServiceBase from "./prisma-service-base";

export default class PlaidAccountService extends PrismaServiceBase {
    constructor() {
        super();
    }

    public async createWithInstitution(plaidAccount: Prisma.PlaidAccountCreateInput): Promise<PlaidAccount> {
        if (!this.prismaClient) {
            throw new Error("Prisma client is not connected");
        }
        try {
            const res = await this.prismaClient.plaidAccount.create({ data: plaidAccount });
            console.log("Created plaid account", res);
            this.prismaClient.$disconnect();
            return res;
        } catch (error) {
            console.log("Error creating plaid account", error);
            throw error;
        }
    }

    public async getAllAccounts() {
        if (!this.prismaClient) {
            throw new Error("Prisma client is not connected");
        }
        try {
            const res = await this.prismaClient.plaidAccount.findMany({});
            this.prismaClient.$disconnect();
            return res;
        } catch (error) {
            console.log("Error getting plaid accounts", error);
            throw error;
        }
    }

    public async getAllAccountsWithInstitution() {
        if (!this.prismaClient) {
            throw new Error("Prisma client is not connected");
        }
        try {
            const res = await this.prismaClient.plaidAccount.findMany({
                include: {
                    plaidInstitution: true
                }
            });
            this.prismaClient.$disconnect();
            return res;
        } catch (error) {
            console.log("Error getting plaid accounts", error);
            throw error;
        }
    }
}