import httpStatus from "http-status";
import resepService from "../services/resep.service.js";
import {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} from "../utils/responseApi.js";

const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File tidak ditemukan" });
    }
    const photoUrl = await resepService.uploadPhoto(req.file);
    responseApiSuccess(res, "Success upload resep photo", photoUrl);
  } catch (err) {
    responseApiFailed(res, `Failed upload resep photo: ${err.message}`);
  }
};

const updateResepPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File foto tidak ditemukan" });
    }
    const updatedResep = await resepService.updateResepPhoto(
      req.params.resepId,
      req.file
    );
    responseApiSuccess(res, "Foto resep berhasil diupdate", updatedResep);
  } catch (err) {
    responseApiFailed(res, `Gagal update foto resep: ${err.message}`);
  }
};

const saveResep = async (req, res) => {
  try {
    const userId = req.user.id;
    const resepId = Number(req.params.resepId);
    if (isNaN(resepId)) {
      return res.status(400).json({ message: "Invalid recipe ID" });
    }
    const result = await resepService.saveResep(userId, resepId);
    responseApiSuccess(res, "Resep berhasil disimpan", result);
  } catch (err) {
    responseApiFailed(res, `Gagal menyimpan resep: ${err.message}`);
  }
};

const unsaveResep = async (req, res) => {
  try {
    const userId = req.user.id;
    const resepId = Number(req.params.resepId);
    if (isNaN(resepId)) {
      return res.status(400).json({ message: "Invalid recipe ID" });
    }
    const result = await resepService.unsaveResep(userId, resepId);
    responseApiSuccess(res, "Resep berhasil dihapus dari simpanan", result);
  } catch (err) {
    responseApiFailed(
      res,
      `Gagal menghapus resep dari simpanan: ${err.message}`
    );
  }
};

const getSavedStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const resepId = Number(req.params.resepId);
    if (isNaN(resepId)) {
      return res.status(400).json({ message: "Invalid recipe ID" });
    }
    const result = await resepService.getSavedStatus(userId, resepId);
    responseApiSuccess(res, "Berhasil mengambil status simpan", result);
  } catch (err) {
    responseApiFailed(res, `Gagal mengambil status simpan: ${err.message}`);
  }
};

const getAllSavedReseps = async (req, res) => {
  try {
    const userId = req.user.id;
    const saved = await resepService.getAllSavedReseps(userId);
    responseApiSuccess(res, "Berhasil mengambil resep yang disimpan", saved);
  } catch (err) {
    responseApiFailed(res, "Gagal mengambil resep yang disimpan");
  }
};

const createResep = async (req, res) => {
  try {
    const result = await resepService.createResep(req.body);
    responseApiCreateSuccess(res, "Success create resep", result);
  } catch (err) {
    responseApiFailed(res, `Failed create resep: ${err.message}`);
  }
};

const getReseps = async (req, res) => {
  try {
    const { page, limit, ...filter } = req.query;
    const result = await resepService.queryReseps(filter, { page, limit });
    responseApiSuccess(res, "Success get reseps", result);
  } catch (err) {
    responseApiFailed(res, `Failed get reseps: ${err.message}`);
  }
};

const getResep = async (req, res) => {
  try {
    const resepId = Number(req.params.resepId);
    if (isNaN(resepId)) {
      return res.status(400).json({ message: "Invalid recipe ID" });
    }
    const currentUserId = req.user?.id || null;
    const result = await resepService.getResepById(resepId, currentUserId);
    responseApiSuccess(res, "Success get resep", result);
  } catch (err) {
    responseApiFailed(res, `Failed get resep: ${err.message}`);
  }
};

const updateResep = async (req, res) => {
  try {
    const resepId = Number(req.params.resepId);
    const result = await resepService.updateResepById(resepId, req.body);
    responseApiSuccess(res, "Success update resep", result);
  } catch (err) {
    responseApiFailed(res, `Failed update resep: ${err.message}`);
  }
};

const deleteResep = async (req, res) => {
  try {
    const result = await resepService.deleteResepById(
      Number(req.params.resepId)
    );
    responseApiSuccess(res, "Success delete resep", result);
  } catch (err) {
    responseApiFailed(res, `Failed delete resep: ${err.message}`);
  }
};

export default {
  uploadPhoto,
  updateResepPhoto,
  saveResep,
  unsaveResep,
  getSavedStatus,
  getAllSavedReseps,
  getReseps,
  getResep,
  createResep,
  updateResep,
  deleteResep,
};
