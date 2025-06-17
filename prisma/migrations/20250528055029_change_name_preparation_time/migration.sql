/*
  Warnings:

  - You are about to drop the column `prepTime` on the `Resep` table. All the data in the column will be lost.
  - Added the required column `preparationTime` to the `Resep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resep" DROP COLUMN "prepTime",
ADD COLUMN     "preparationTime" TEXT NOT NULL;
