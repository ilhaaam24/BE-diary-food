import express from "express";
import { auth, authAcces } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import feedbackValidation from "../../validations/feedback.validation.js";
import feedbackController from "../../controllers/feedback.controller.js";

const router = express.Router();

router.route("/").post(auth(), validate(feedbackValidation.createFeedbackValidation), feedbackController.createFeedback).get(auth(), feedbackController.getFeedbacks);

export default router;
