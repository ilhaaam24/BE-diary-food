import express from "express";
import validate from "../../middlewares/validate.js";
import { auth, authAcces } from "../../middlewares/auth.js";
import adminResepValidation from "../../validations/adminResep.validation.js";
import adminResepController from "../../controllers/adminResep.controller.js";
const router = express.Router();

router.route("/").get(auth(), authAcces(), adminResepController.getAllReseps);

router.route("/pending").get(auth(), authAcces(), adminResepController.getPendingReseps);

router.route("/").get(auth(), authAcces(), adminResepController.getPendingReseps);

router.route("/:id/approve").put(validate(adminResepValidation.resepId), adminResepController.approveResep);

router.route("/:id/reject").put(validate(adminResepValidation.resepId), adminResepController.rejectResep);

export default router;
