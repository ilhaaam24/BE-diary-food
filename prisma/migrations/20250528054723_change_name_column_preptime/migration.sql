/*
  Warnings:

  - You are about to drop the column `prevTime` on the `Resep` table. All the data in the column will be lost.
  - Added the required column `prepTime` to the `Resep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resep" DROP COLUMN "prevTime",
ADD COLUMN     "prepTime" TEXT NOT NULL;
