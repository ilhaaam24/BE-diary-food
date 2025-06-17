import httpStatus from "http-status";
import prisma from "../../prisma/index.js";
import ApiError from "../utils/ApiError.js";
import uploadFile from "../utils/uploadFile.js";

const uploadPhoto = async (file, oldFileUrl = null) => {
  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "File not found");
  }
  const photoUrl = await uploadFile(file, "photo-resep", oldFileUrl);
  return photoUrl;
};

const updateResepPhoto = async (resepId, file) => {
  const resep = await prisma.resep.findUnique({ where: { id: resepId } });
  if (!resep) {
    throw new ApiError(httpStatus.NOT_FOUND, "Resep tidak ditemukan");
  }
  const newPhotoUrl = await uploadFile(file, "photo-resep", resep.photoResep);
  const updated = await prisma.resep.update({
    where: { id: resep.id },
    data: { photoResep: newPhotoUrl },
  });
  return updated;
};

const saveResep = async (userId, resepId) => {
  const existing = await prisma.savedResep.findUnique({
    where: {
      userId_resepId: { userId, resepId },
    },
  });
  if (existing) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Resep sudah disimpan sebelumnya."
    );
  }
  const saved = await prisma.savedResep.create({
    data: { userId, resepId },
  });
  const savesCount = await prisma.savedResep.count({ where: { resepId } });
  return { ...saved, savesCount };
};

const unsaveResep = async (userId, resepId) => {
  const existing = await prisma.savedResep.findUnique({
    where: {
      userId_resepId: { userId, resepId },
    },
  });
  if (!existing) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Resep tidak ditemukan di simpanan."
    );
  }
  const deleted = await prisma.savedResep.delete({
    where: {
      userId_resepId: { userId, resepId },
    },
  });
  const savesCount = await prisma.savedResep.count({ where: { resepId } });
  return { ...deleted, savesCount };
};

const getSavedStatus = async (userId, resepId) => {
  const saved = await prisma.savedResep.findUnique({
    where: {
      userId_resepId: { userId, resepId },
    },
  });
  const savesCount = await prisma.savedResep.count({ where: { resepId } });
  return { isSaved: !!saved, savesCount };
};

const getAllSavedReseps = async (userId) => {
  return prisma.savedResep.findMany({
    where: { userId },
    include: {
      resep: {
        include: {
          kategori: { select: { nama: true } },
          user: { select: { name: true, photo: true } },
          bahanList: true,
          langkahList: { orderBy: { urutan: "asc" } },
        },
      },
    },
    orderBy: { savedAt: "desc" },
  });
};

const createResep = async (data) => {
  return prisma.$transaction(async (tx) => {
    const resep = await tx.resep.create({
      data: {
        nama: data.nama,
        photoResep: data.photoResep,
        preparationTime: data.preparationTime,
        cookingTime: data.cookingTime,
        servingTime: data.servingTime,
        description: data.description,
        kategoriId: data.kategoriId,
        userId: data.userId,
      },
    });
    await tx.bahan.createMany({
      data: data.bahan.map((bahan) => ({
        resepId: resep.id,
        nama: bahan.nama,
        jumlah: bahan.jumlah,
      })),
    });
    await tx.langkahPembuatan.createMany({
      data: data.langkahPembuatan.map((langkah) => ({
        resepId: resep.id,
        urutan: langkah.urutan,
        deskripsi: langkah.deskripsi,
      })),
    });
    const resepLengkap = await tx.resep.findUnique({
      where: { id: resep.id },
      include: { bahanList: true, langkahList: true },
    });
    return resepLengkap;
  });
};

const queryReseps = async (filter, options) => {
  const page = parseInt(options.page || 1);
  const limit = parseInt(options.limit || 10);
  const skip = (page - 1) * limit;
  const reseps = await prisma.resep.findMany({
    where: { ...filter, isApproved: "APPROVED" },
    skip,
    take: limit,
    include: {
      user: { select: { name: true, photo: true } },
      kategori: true,
      bahanList: true,
      langkahList: { orderBy: { urutan: "asc" } },
    },
  });
  const totalItems = await prisma.resep.count({
    where: { ...filter, isApproved: "APPROVED" },
  });
  const totalPages = Math.ceil(totalItems / limit);
  return { reseps, pagination: { totalItems, totalPages, currentPage: page } };
};

const getResepById = async (id, currentUserId = null) => {
  const resep = await prisma.resep.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, photo: true } },
      bahanList: true,
      langkahList: { orderBy: { urutan: "asc" } },
    },
  });
  if (!resep) throw new ApiError(httpStatus.NOT_FOUND, "Resep tidak ditemukan");
  const savesCount = await prisma.savedResep.count({ where: { resepId: id } });
  const totalComments = await prisma.comment.count({ where: { resepId: id } });
  const reviewStats = await prisma.comment.aggregate({
    where: { resepId: id, rating: { gt: 0 } },
    _count: { id: true },
    _avg: { rating: true },
  });
  const totalReviews = reviewStats._count.id;
  const averageRating = reviewStats._avg.rating
    ? parseFloat(reviewStats._avg.rating.toFixed(1))
    : 0.0;
  let isSavedByCurrentUser = false;
  if (currentUserId) {
    const savedByUser = await prisma.savedResep.findFirst({
      where: { resepId: id, userId: currentUserId },
    });
    isSavedByCurrentUser = !!savedByUser;
  }
  return {
    ...resep,
    totalComments,
    totalReviews,
    averageRating,
    savesCount,
    isSavedByCurrentUser,
  };
};

const updateResepById = async (id, updateBody, file) => {
  const resep = await prisma.resep.findUnique({ where: { id } });
  if (!resep) throw new ApiError(httpStatus.NOT_FOUND, "Resep tidak ditemukan");
  const operations = [];
  if (updateBody.bahan) {
    operations.push(prisma.bahan.deleteMany({ where: { resepId: id } }));
    operations.push(
      prisma.bahan.createMany({
        data: updateBody.bahan.map((bahan) => ({
          resepId: id,
          nama: bahan.nama,
          jumlah: bahan.jumlah,
        })),
      })
    );
    delete updateBody.bahan;
  }
  if (updateBody.langkahPembuatan) {
    operations.push(
      prisma.langkahPembuatan.deleteMany({ where: { resepId: id } })
    );
    operations.push(
      prisma.langkahPembuatan.createMany({
        data: updateBody.langkahPembuatan.map((langkah) => ({
          resepId: id,
          urutan: langkah.urutan,
          deskripsi: langkah.deskripsi,
        })),
      })
    );
    delete updateBody.langkahPembuatan;
  }
  operations.push(prisma.resep.update({ where: { id }, data: updateBody }));
  await prisma.$transaction(operations);
  const updatedResep = await prisma.resep.findUnique({
    where: { id },
    include: { bahanList: true, langkahList: { orderBy: { urutan: "asc" } } },
  });
  return updatedResep;
};

const deleteResepById = async (id) => {
  const existingResep = await prisma.resep.findUnique({ where: { id } });
  if (!existingResep)
    throw new ApiError(httpStatus.NOT_FOUND, "Resep tidak ditemukan");
  return prisma.resep.delete({
    where: { id },
    include: { bahanList: true, langkahList: { orderBy: { urutan: "asc" } } },
  });
};

export default {
  uploadPhoto,
  updateResepPhoto,
  saveResep,
  unsaveResep,
  getSavedStatus,
  getAllSavedReseps,
  createResep,
  queryReseps,
  getResepById,
  updateResepById,
  deleteResepById,
};
