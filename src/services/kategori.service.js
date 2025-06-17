import httpStatus from "http-status";
import prisma from "../../prisma/index.js";
import ApiError from "../utils/ApiError.js";

const createKategori = async (body) => {
  const { nama, parentId } = body;

  // Validasi parentId jika ada
  if (parentId) {
    const parentExists = await prisma.kategori.findUnique({
      where: { id: Number(parentId) },
    });
    if (!parentExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Kategori induk tidak ditemukan");
    }
  }

  const kategori = await prisma.kategori.create({
    data: {
      nama,
      parentId: parentId ? Number(parentId) : null,
    },
  });
  return kategori;
};

const getKategoris = async () => {
  return prisma.kategori.findMany({
    include: {
      resep: true,
      parent: true,
      subcategories: true,
    },
  });
};

const getKategoriById = async (id) => {
  const kategori = await prisma.kategori.findUnique({
    where: { id: Number(id) },
    include: {
      resep: true,
      parent: true,
      subcategories: true,
    },
  });
  if (!kategori) {
    throw new ApiError(httpStatus.NOT_FOUND, "Kategori tidak ditemukan");
  }
  return kategori;
};

const updateKategoriById = async (id, data) => {
  const { nama, parentId } = data;

  const kategori = await prisma.kategori.findUnique({
    where: { id: Number(id) },
  });
  if (!kategori) {
    throw new ApiError(httpStatus.NOT_FOUND, "Kategori tidak ditemukan");
  }

  // Validasi parentId jika ada
  if (parentId) {
    const parentExists = await prisma.kategori.findUnique({
      where: { id: Number(parentId) },
    });
    if (!parentExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Kategori induk tidak ditemukan");
    }
    // Cegah self-referencing
    if (Number(parentId) === Number(id)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Kategori tidak bisa menjadi induk sendiri");
    }
  }

  return prisma.kategori.update({
    where: { id: Number(id) },
    data: {
      nama,
      parentId: parentId ? Number(parentId) : null,
    },
  });
};

const deleteKategoriById = async (id) => {
  const kategori = await prisma.kategori.findUnique({
    where: { id: Number(id) },
    include: {
      resep: true,
      subcategories: true,
    },
  });
  if (!kategori) {
    throw new ApiError(httpStatus.NOT_FOUND, "Kategori tidak ditemukan");
  }

  if (kategori.resep.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Kategori memiliki resep terkait, tidak bisa dihapus");
  }
  if (kategori.subcategories.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Kategori memiliki subkategori, hapus subkategori terlebih dahulu");
  }

  return prisma.kategori.delete({
    where: { id: Number(id) },
  });
};

export default {
  createKategori,
  getKategoris,
  getKategoriById,
  updateKategoriById,
  deleteKategoriById,
};
