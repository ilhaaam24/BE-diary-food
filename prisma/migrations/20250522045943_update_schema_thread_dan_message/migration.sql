/*
  Warnings:

  - You are about to drop the `HasilPencarian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pencarian` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RoleChat" AS ENUM ('user', 'assistant');

-- DropForeignKey
ALTER TABLE "HasilPencarian" DROP CONSTRAINT "HasilPencarian_pencarianId_fkey";

-- DropForeignKey
ALTER TABLE "HasilPencarian" DROP CONSTRAINT "HasilPencarian_resepId_fkey";

-- DropForeignKey
ALTER TABLE "Pencarian" DROP CONSTRAINT "Pencarian_userId_fkey";

-- DropTable
DROP TABLE "HasilPencarian";

-- DropTable
DROP TABLE "Pencarian";

-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "role" "RoleChat" NOT NULL,
    "content" TEXT NOT NULL,
    "thought" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "threadId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
