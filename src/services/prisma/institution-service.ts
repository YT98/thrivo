import PrismaServiceBase, { IPrismaService } from "./prisma-service-base";
import { PlaidInstitution, Prisma } from "@prisma/client";

export class InstitutionService extends PrismaServiceBase {
    constructor() {
        super();
    }

    public async create(institution: Prisma.PlaidInstitutionCreateInput) {
        if (!this.prismaClient) {
            throw new Error("Prisma client is not connected");
        }
        const res = await this.prismaClient.plaidInstitution.create({
            data: institution
        });
        this.prismaClient.$disconnect();
        return res;
    }

    public async getInstitutionByPlaidId(plaidInstitutionId: string): Promise<PlaidInstitution | null> {
        if (!this.prismaClient) {
            throw new Error("Prisma client is not connected");
        }
        console.log("Getting institution by plaid id", plaidInstitutionId);
        try {
            const res = await this.prismaClient.plaidInstitution.findUnique({
                where: {
                    plaidInstitutionId: plaidInstitutionId,
                }
            });
            this.prismaClient.$disconnect();
            return res;
        }
        catch(error) {
            console.log("Error getting institution by plaid id", error);
            return null;
        }
    }
}