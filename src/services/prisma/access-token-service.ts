import { AccessToken, Prisma, PrismaClient } from "@prisma/client";
import PrismaServiceBase, { IPrismaService } from "./prisma-service-base";

export class AccessTokenService extends PrismaServiceBase {
    constructor() {
        super();
    }

    public async create(accessToken: Prisma.AccessTokenCreateInput): Promise<AccessToken> {
        if (!this.prismaClient) {
            throw new Error("Prisma client is not connected");
        }
        const res = await this.prismaClient.accessToken.create({
            data: accessToken
        });
        this.prismaClient.$disconnect();
        return res;
    }

}