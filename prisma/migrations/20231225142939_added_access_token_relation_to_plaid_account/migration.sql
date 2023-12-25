/*
  Warnings:

  - Added the required column `accessTokenId` to the `PlaidAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlaidAccount" ADD COLUMN     "accessTokenId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PlaidAccount" ADD CONSTRAINT "PlaidAccount_accessTokenId_fkey" FOREIGN KEY ("accessTokenId") REFERENCES "AccessToken"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
