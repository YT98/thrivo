import { PrismaClient } from "@prisma/client";

export class AccessTokenService {
    private prismaClient?: PrismaClient;

    constructor() {
        this.prismaClient = undefined;
    }

    public connect() {
        this.prismaClient = new PrismaClient();
    }

    public async createAccessToken(accessToken: string) {
        if (!this.prismaClient) {
            throw new Error("Prisma client is not connected");
        }
        await this.prismaClient.accessToken.create({
            data: {
                token: accessToken,
            }
        });
        this.prismaClient.$disconnect();
    }


}