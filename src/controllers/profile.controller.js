import { responseApiFailed, responseApiSuccess } from "../utils/responseApi.js";
import profileService from "../services/profile.service.js";

const index = async (req, res, next) => {
  try {
    console.log("Profile endpoint hit, req.user:", req.user); // Debug log
    const userId = req.user.id; // Adjust to req.user.sub if your JWT uses sub
    if (!userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User ID not found in token");
    }
    const dataProfile = await profileService.getProfile(userId);
    return responseApiSuccess(res, "Successfully retrieved profile data", dataProfile);
  } catch (error) {
    console.error("Index error:", error.message); // Debug log
    return responseApiFailed(res, error.message || "Failed to retrieve profile data");
  }
};

const getRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User ID not found in token");
    }
    const recipes = await profileService.getUserRecipes(userId);
    return responseApiSuccess(res, "Successfully retrieved recipes data", recipes);
  } catch (error) {
    return responseApiFailed(res, error.message || "Failed to retrieve recipes data");
  }
};

export default { index, getRecipes };
