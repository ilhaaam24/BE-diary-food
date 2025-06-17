import express from "express";
import validate from "../../middlewares/validate.js";
import { auth } from "../../middlewares/auth.js";
import commentValidation from "../../validations/comment.validation.js";
import commentController from "../../controllers/comment.controller.js";

const router = express.Router({ mergeParams: true });
router.route("/").post(auth(), validate(commentValidation.createComment), commentController.createComment).get(commentController.getComments);

export default router;
