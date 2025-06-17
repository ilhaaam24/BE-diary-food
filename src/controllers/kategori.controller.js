import httpStatus from "http-status";
import kategoriService from "../services/kategori.service.js";
import { responseApiSuccess, responseApiFailed, responseApiCreateSuccess } from "../utils/responseApi.js";
import ApiError from "../utils/ApiError.js";

const getKategoris = async (req, res) => {
  try {
    const result = await kategoriService.getKategoris();
    responseApiSuccess(res, "Berhasil mendapatkan semua kategori", result);
  } catch (err) {
    if (err instanceof ApiError) {
      responseApiFailed(res, err.message, err.statusCode);
    } else {
      responseApiFailed(res, "Gagal mendapatkan semua kategori", httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

const getKategori = async (req, res) => {
  try {
    const result = await kategoriService.getKategoriById(req.params.kategoriId);
    responseApiSuccess(res, "Berhasil mendapatkan kategori", result);
  } catch (err) {
    if (err instanceof ApiError) {
      responseApiFailed(res, err.message, err.statusCode);
    } else {
      responseApiFailed(res, "Gagal mendapatkan kategori", httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

const createKategori = async (req, res) => {
  try {
    const result = await kategoriService.createKategori(req.body);
    responseApiCreateSuccess(res, "Berhasil membuat kategori", result);
  } catch (err) {
    if (err instanceof ApiError) {
      responseApiFailed(res, err.message, err.statusCode);
    } else {
      responseApiFailed(res, "Gagal membuat kategori", httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

const updateKategori = async (req, res) => {
  try {
    const result = await kategoriService.updateKategoriById(req.params.kategoriId, req.body);
    responseApiSuccess(res, "Berhasil memperbarui kategori", result);
  } catch (err) {
    if (err instanceof ApiError) {
      responseApiFailed(res, err.message, err.statusCode);
    } else {
      responseApiFailed(res, "Gagal memperbarui kategori", httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

const deleteKategori = async (req, res) => {
  try {
    await kategoriService.deleteKategoriById(req.params.kategoriId);
    responseApiSuccess(res, "Berhasil menghapus kategori", null, httpStatus.NO_CONTENT);
  } catch (err) {
    if (err instanceof ApiError) {
      responseApiFailed(res, err.message, err.statusCode);
    } else {
      responseApiFailed(res, "Gagal menghapus kategori", httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

export default {
  getKategoris,
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
};
