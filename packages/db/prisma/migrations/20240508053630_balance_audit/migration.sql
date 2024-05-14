-- CreateTable
CREATE TABLE "balanceAudit" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "balanceAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "balanceAudit_userId_key" ON "balanceAudit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "balanceAudit_date_key" ON "balanceAudit"("date");

-- AddForeignKey
ALTER TABLE "balanceAudit" ADD CONSTRAINT "balanceAudit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
