import { PrismaClient } from "@prisma/client";
import prisma from "../../db/db";

export default class PrismaServiceBase {
    protected prismaClient?: PrismaClient;

    constructor() {
        this.prismaClient = prisma;
    }
}