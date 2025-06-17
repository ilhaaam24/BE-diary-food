import express from "express";
import profileController from "../../controllers/profile.controller.js";

import { auth, authAcces } from "../../middlewares/auth.js";
import resepController from "../../controllers/resep.controller.js";
import resepValidation from "../../validations/resep.validation.js";
import validate from "../../middlewares/validate.js";
import userValidation from "../../validations/user.validation.js";
import userController from "../../controllers/user.controller.js";

const router = express.Router();

router.route("/").put(auth(), validate(userValidation.updateUser), userController.updateUser).get(auth(), profileController.index);

// user recipe
router.route("/recipes").post(auth(), validate(resepValidation.createResep), resepController.createResep).get(auth(), profileController.getRecipes);
router.route("/recipe/:resepId").put(auth(), resepController.updateResep).delete(auth(), resepController.deleteResep).get(auth(), resepController.getResep);

export default router;
