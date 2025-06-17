import express from "express";
import { auth } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import threadValidation from "../../validations/thread.validation.js";
import threadController from "../../controllers/thread.controller.js";

const router = express.Router();

router.get("/", auth(), threadController.getThreads);

router
  .route("/:threadId")
  .get(auth(), validate(threadValidation.getThread), threadController.getThread)
  .delete(
    auth(),
    validate(threadValidation.deleteThread),
    threadController.deleteThread
  );

export default router;
