import express from "express";
import { auth } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import messageValidation from "../../validations/message.validation.js";
import messageController from "../../controllers/message.controller.js";

const router = express.Router();

router.post(
  "/new",
  auth(),
  validate(messageValidation.createFirstMessage),
  messageController.sendFirstMessage
);

router
  .route("/:threadId")
  .post(
    auth(),
    validate(messageValidation.createMessage),
    messageController.sendMessage
  )
  .get(
    validate(messageValidation.getMessages),
    messageController.getMessagesByThread
  );

export default router;
