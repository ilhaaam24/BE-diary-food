-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resep" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "photoResep" TEXT,
    "kategoriId" INTEGER NOT NULL,
    "tanggalUnggahan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "tanggalAcc" TIMESTAMP(3),
    "disetujuiOleh" INTEGER,

    CONSTRAINT "Resep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bahan" (
    "id" SERIAL NOT NULL,
    "resepId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "jumlah" TEXT NOT NULL,

    CONSTRAINT "Bahan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LangkahPembuatan" (
    "id" SERIAL NOT NULL,
    "resepId" INTEGER NOT NULL,
    "urutan" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "LangkahPembuatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pencarian" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "kataKunci" TEXT NOT NULL,
    "tanggalPencarian" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pencarian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HasilPencarian" (
    "id" SERIAL NOT NULL,
    "pencarianId" INTEGER NOT NULL,
    "resepId" INTEGER NOT NULL,

    CONSTRAINT "HasilPencarian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Resep" ADD CONSTRAINT "Resep_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resep" ADD CONSTRAINT "Resep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resep" ADD CONSTRAINT "Resep_disetujuiOleh_fkey" FOREIGN KEY ("disetujuiOleh") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bahan" ADD CONSTRAINT "Bahan_resepId_fkey" FOREIGN KEY ("resepId") REFERENCES "Resep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LangkahPembuatan" ADD CONSTRAINT "LangkahPembuatan_resepId_fkey" FOREIGN KEY ("resepId") REFERENCES "Resep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pencarian" ADD CONSTRAINT "Pencarian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilPencarian" ADD CONSTRAINT "HasilPencarian_pencarianId_fkey" FOREIGN KEY ("pencarianId") REFERENCES "Pencarian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilPencarian" ADD CONSTRAINT "HasilPencarian_resepId_fkey" FOREIGN KEY ("resepId") REFERENCES "Resep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
