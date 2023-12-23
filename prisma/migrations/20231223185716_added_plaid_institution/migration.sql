-- CreateTable
CREATE TABLE "PlaidInstitution" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "plaidInstitutionId" TEXT NOT NULL,

    CONSTRAINT "PlaidInstitution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlaidInstitution_plaidInstitutionId_key" ON "PlaidInstitution"("plaidInstitutionId");
