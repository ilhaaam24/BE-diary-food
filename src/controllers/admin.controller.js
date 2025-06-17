import { responseApiSuccess, responseApiFailed } from "../utils/responseApi.js";
import adminService from "../services/admin.service.js";
const { getDashboardData, getAllCategoriesData } = adminService;

const getDashboard = async (req, res) => {
  try {
    const dashboardData = await getDashboardData();
    return responseApiSuccess(res, "Successfully retrieved dashboard data", dashboardData);
  } catch (error) {
    return responseApiFailed(res, error.message);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesData();
    return responseApiSuccess(res, "Berhasil mengambil kategori", categories);
  } catch (error) {
    return responseApiFailed(res, error.message);
  }
};
const addCategory = async (req, res) => {
  try {
  } catch (error) {
    return responseApiFailed(res, error.message);
  }
};



export default {
  getDashboard,
  getAllCategories,
  addCategory,
};
