import express from "express";
import { auth } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import resepValidation from "../../validations/resep.validation.js";
import resepController from "../../controllers/resep.controller.js";
import commentRouter from "./comment.route.js";
import upload from "../../utils/upload.js";

const router = express.Router();

router.use("/:resepId/comment", commentRouter);

router
  .route("/")
  .post(validate(resepValidation.createResep), resepController.createResep)
  .get(resepController.getReseps);

router.post(
  "/:resepId/save",
  auth(),
  validate(resepValidation.saveResep),
  resepController.saveResep
);

router.delete(
  "/:resepId/unsave",
  auth(),
  validate(resepValidation.unsaveResep),
  resepController.unsaveResep
);

router.get(
  "/:resepId/saved-status",
  auth(),
  validate(resepValidation.getResep),
  resepController.getSavedStatus
);

router.get("/saved", auth(), resepController.getAllSavedReseps);

router.post(
  "/upload-photo",
  auth(),
  upload.single("photo"),
  validate(resepValidation.uploadPhoto),
  resepController.uploadPhoto
);

router.put(
  "/:resepId/update-photo",
  auth(),
  upload.single("file"),
  validate(resepValidation.updateResepPhoto),
  resepController.updateResepPhoto
);

router
  .route("/:resepId")
  .get(validate(resepValidation.getResep), resepController.getResep)
  .put(
    auth(),
    validate(resepValidation.updateResep),
    resepController.updateResep
  )
  .delete(
    auth(),
    validate(resepValidation.deleteResep),
    resepController.deleteResep
  );

export default router;
