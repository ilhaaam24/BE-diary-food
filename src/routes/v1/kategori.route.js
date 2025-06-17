import express from "express";
import validate from "../../middlewares/validate.js";
import kategoriValidation from "../../validations/kategori.validation.js";
import kategoriController from "../../controllers/kategori.controller.js";
import { auth, authAcces } from "../../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    authAcces(),
    validate(kategoriValidation.createKategori),
    kategoriController.createKategori
  )
  .get(kategoriController.getKategoris);

router
  .route("/:kategoriId")
  .get(validate(kategoriValidation.getKategori), kategoriController.getKategori)
  .put(
    auth(),
    authAcces(),
    validate(kategoriValidation.updateKategori),
    kategoriController.updateKategori
  )
  .delete(
    auth(),
    authAcces(),
    validate(kategoriValidation.deleteKategori),
    kategoriController.deleteKategori
  );

export default router;
