import { createFeedbackData, getFeedbacksData } from "../services/feedback.service.js";
import { responseApiCreateSuccess, responseApiFailed, responseApiSuccess } from "../utils/responseApi.js";

const createFeedback = async (req, res) => {
  try {
    const feedback = await createFeedbackData(req.user.id, req.body);
    responseApiCreateSuccess(res, "Create feedback success", feedback);
  } catch (error) {
    responseApiFailed(res, "Create feedback failed", error);
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await getFeedbacksData();
    responseApiSuccess(res, "Get feedback data succes", feedbacks);
  } catch (error) {
    responseApiFailed(res, "Get feedbacks failed", error);
  }
};

export default {
  createFeedback,
  getFeedbacks,
};
