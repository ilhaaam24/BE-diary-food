import express from "express";
import adminController from "../../controllers/admin.controller.js";
import validate from "../../middlewares/validate.js";
import kategoriValidation from "../../validations/kategori.validation.js";
import kategoriController from "../../controllers/kategori.controller.js";

import resepController from "../../controllers/resep.controller.js";
import { auth, authAcces } from "../../middlewares/auth.js";
import resepValidation from "../../validations/resep.validation.js";
import adminResepController from "../../controllers/adminResep.controller.js";
import adminResepValidation from "../../validations/adminResep.validation.js";

const router = express.Router();

// main dashboard
router.route("/").get(auth(), authAcces(), adminController.getDashboard);

// category
router.route("/categories").post(auth(), authAcces(), validate(kategoriValidation.createKategori), kategoriController.createKategori).get(auth(), authAcces(), adminController.getAllCategories);
router.route("/categories/:kategoriId").delete(auth(), authAcces(), validate(kategoriValidation.deleteKategori), kategoriController.deleteKategori);

// recipe
router.route("/recipes").get(auth(), authAcces(), resepController.getReseps);
router.route("/recipes/:resepId").get(auth(), authAcces(), validate(resepValidation.getResep), resepController.getResep).delete(auth(), authAcces(),validate(resepValidation.deleteResep), resepController.deleteResep);


//approve recipe page
router.route("/pending-recipes").get(auth(), authAcces(), adminResepController.getPendingReseps);
router.route("/pending-recipes/:id/approve").put(auth(), authAcces(),validate(adminResepValidation.resepId), adminResepController.approveResep);
router.route("/pending-recipes/:id/reject").put(auth(), authAcces(),validate(adminResepValidation.resepId), adminResepController.rejectResep);

export default router;
