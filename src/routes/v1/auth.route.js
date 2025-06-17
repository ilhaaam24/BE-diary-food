import express from "express";
import passport from "passport";
import validate from "../../middlewares/validate.js";
import authValidation from "../../validations/auth.validation.js";
import authController from "../../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

router.post("/login", validate(authValidation.login), authController.login);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleCallback
);

// Facebook OAuth routes
// router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), authController.facebookCallback);

export default router;
