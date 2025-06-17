-- CreateTable
CREATE TABLE "SavedResep" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "resepId" INTEGER NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedResep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedResep_userId_resepId_key" ON "SavedResep"("userId", "resepId");

-- AddForeignKey
ALTER TABLE "SavedResep" ADD CONSTRAINT "SavedResep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedResep" ADD CONSTRAINT "SavedResep_resepId_fkey" FOREIGN KEY ("resepId") REFERENCES "Resep"("id") ON DELETE CASCADE ON UPDATE CASCADE;
