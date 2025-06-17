/*
  Warnings:

  - The `isApproved` column on the `Resep` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusResep" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Resep" DROP COLUMN "isApproved",
ADD COLUMN     "isApproved" "StatusResep" NOT NULL DEFAULT 'PENDING';
