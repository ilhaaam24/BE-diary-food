import express from "express";
import { auth, authAcces } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import userValidation from "../../validations/user.validation.js";
import userController from "../../controllers/user.controller.js";
import upload from "../../utils/upload.js";

const router = express.Router();

router.route("/").post(auth(), authAcces(), validate(userValidation.createUser), userController.createUser).get(auth(), authAcces(), userController.getUsers);

router.get("/searchByEmail", auth(), authAcces(), validate(userValidation.getUserByEmail), userController.getUserByEmail);

router.post("/upload-photo", auth(), upload.single("file"), validate(userValidation.uploadPhoto), userController.uploadPhoto);

router.put("/:userId/update-photo", auth(), upload.single("file"), validate(userValidation.updateUserPhoto), userController.updateUserPhoto);

router
  .route("/:userId")
  .get(auth(), validate(userValidation.getUser), userController.getUser)
  .put(auth(), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth(), authAcces(), validate(userValidation.deleteUser), userController.deleteUser);

// Tambahkan endpoint /me
router.get("/me", auth(), userController.getCurrentUser);

export default router;
