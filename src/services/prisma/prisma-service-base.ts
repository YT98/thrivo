import { PrismaClient } from "@prisma/client";

export default class PrismaServiceBase {
    protected prismaClient?: PrismaClient;

    constructor() {
        this.prismaClient = undefined;
    }

    public connect() {
        this.prismaClient = new PrismaClient();
    }
}