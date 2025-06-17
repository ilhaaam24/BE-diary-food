import { responseApiCreateSuccess, responseApiFailed, responseApiSuccess } from "../utils/responseApi.js";
import commentService from "../services/comment.service.js";

const createComment = async (req, res) => {
  try {
    const resepId = parseInt(req.params.resepId);
    const { comment, rating } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }
    console.log("userId:", userId);
    console.log("resepId:", resepId);
    console.log("comment:", comment);
    console.log("comment:", rating);

    const result = await commentService.createCommentData(userId, resepId, { comment, rating }); // Call createUlasan
    return responseApiCreateSuccess(res, "Review created successfully", result, 201);
  } catch (error) {
    console.error("Create comment error:", error);
    return responseApiFailed(res, "Failed to create review", error, error.status || 400);
  }
};

const getComments = async (req, res) => {
  try {
    const resepId = parseInt(req.params.resepId);

    const result = await commentService.getCommentsData(resepId);
    return responseApiSuccess(res, "Get comment success", result);
  } catch (error) {
    return responseApiFailed(res, "Get comment failed", error);
  }
};

export default {
  createComment,
  getComments,
};
