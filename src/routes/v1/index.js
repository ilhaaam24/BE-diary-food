import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import resepRoute from "./resep.route.js";
import kategoriRoute from "./kategori.route.js";
import bahanRoute from "./bahan.route.js";
import langkahRoute from "./langkah.route.js";
import adminResepRoute from "./adminResep.route.js";
import threadRoute from "./thread.route.js";
import messageRoute from "./message.route.js";
import adminRoute from "./adminRoute.route.js";
import profile from "./profile.route.js";
import feedbackRoute from "./feedback.route.js";
import commentRoute from "./comment.route.js";
import path from "path";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/category",
    route: kategoriRoute,
  },
  {
    path: "/resep",
    route: resepRoute,
  },
  {
    path: "/bahan",
    route: bahanRoute,
  },
  {
    path: "/langkah",
    route: langkahRoute,
  },

  {
    path: "/admin/dashboard",
    route: adminRoute,
  },
  {
    path: "/profile",
    route: profile,
  },
  {
    path: "/feedbacks",
    route: feedbackRoute,
  },
  {
    path: "/admin/resep",
    route: adminResepRoute,
  },
  {
    path: "/threads",
    route: threadRoute,
  },
  {
    path: "/messages",
    route: messageRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
