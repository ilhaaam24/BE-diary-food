import express from "express";
import validate from "../../middlewares/validate.js";
import { auth } from "../../middlewares/auth.js";
import langkahValidation from "../../validations/langkah.validation.js";
import langkahController from "../../controllers/langkah.controller.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(langkahValidation.createLangkah),
    langkahController.createLangkah
  );

router
  .route("/:langkahId")
  .put(
    auth(),
    validate(langkahValidation.updateLangkah),
    langkahController.updateLangkah
  )
  .delete(
    auth(),
    validate(langkahValidation.deleteLangkah),
    langkahController.deleteLangkah
  );

export default router;
