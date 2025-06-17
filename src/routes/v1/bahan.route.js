import express from "express";
import validate from "../../middlewares/validate.js";
import { auth } from "../../middlewares/auth.js";
import bahanValidation from "../../validations/bahan.validation.js";
import bahanController from "../../controllers/bahan.controller.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(bahanValidation.createBahan),
    bahanController.createBahan
  );

router
  .route("/:bahanId")
  .put(
    auth(),
    validate(bahanValidation.updateBahan),
    bahanController.updateBahan
  )
  .delete(
    auth(),
    validate(bahanValidation.deleteBahan),
    bahanController.deleteBahan
  );

export default router;
