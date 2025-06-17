-- AlterTable
ALTER TABLE "Kategori" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parent_id" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Kategori" ADD CONSTRAINT "Kategori_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Kategori"("id") ON DELETE SET NULL ON UPDATE CASCADE;
