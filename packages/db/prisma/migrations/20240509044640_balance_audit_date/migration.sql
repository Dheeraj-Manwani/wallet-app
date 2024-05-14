/*
  Warnings:

  - Added the required column `Balance` to the `balanceAudit` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `balanceAudit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "balanceAudit_date_key";

-- AlterTable
ALTER TABLE "balanceAudit" ADD COLUMN     "Balance" INTEGER NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
