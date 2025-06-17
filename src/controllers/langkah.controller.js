import langkahService from "../services/langkah.service.js";
import {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} from "../utils/responseApi.js";

const createLangkah = async (req, res) => {
  try {
    const result = await langkahService.createLangkah(req.body);
    responseApiCreateSuccess(res, "Success create langkah", result);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah langkah", error });
  }
};

const updateLangkah = async (req, res) => {
  try {
    const result = await langkahService.updateLangkahById(
      req.params.langkahId,
      req.body
    );
    responseApiSuccess(res, "Success update langkah", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed update langkah");
  }
};

const deleteLangkah = async (req, res) => {
  try {
    const result = await langkahService.deleteLangkahById(req.params.langkahId);
    responseApiSuccess(res, "Success delete langkah", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed delete langkah");
  }
};

export default { createLangkah, updateLangkah, deleteLangkah };
