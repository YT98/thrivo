import { AccessToken, Prisma } from "@prisma/client";
import PrismaServiceBase from "./prisma-service-base";
import prisma from "../../db/db";

export default class AccessTokenService extends PrismaServiceBase {
    constructor() {
        super();
    }

    public async create(accessToken: Prisma.AccessTokenCreateInput): Promise<AccessToken> {
        this.prismaClient = prisma;
        const res = await this.prismaClient.accessToken.create({
            data: accessToken
        });
        this.prismaClient.$disconnect();
        return res;
    }

}