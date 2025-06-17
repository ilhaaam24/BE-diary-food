import express from "express";
import httpStatus from "http-status";
import routes from "./routes/v1/index.js";
import config from "./config/config.js";
import morgan from "./config/morgan.js";
import { errorConverter, errorHandler } from "./middlewares/error.js";
import ApiError from "./utils/ApiError.js";
import helmet from "helmet";
import { body, validationResult } from "express-validator";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import { jwtStrategy, googleStrategy } from "./config/passport.js";
import setupSwagger from "./docs/swaggerConfig.js";

let app;

try {
  console.log("Starting app.js initialization...");
  app = express();

  // Logging middleware untuk debugging
  if (config.env !== "test") {
    console.log("Applying morgan middleware...");
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }

  // Keamanan dan optimasi
  console.log("Applying security and optimization middleware...");
  app.use(helmet());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(
    [
      body("*").trim().escape(), // Sanitasi input menggunakan express-validator
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  );
  app.use(compression());

  // Konfigurasi CORS
  console.log("Applying CORS with CLIENT_URL:", config.clientUrl);
  app.use(
    cors({
      origin: [
        "https://diary-food1222.vercel.app", // Frontend production
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  app.options("*", cors());

  // Middleware untuk menangani multipart/form-data
  app.use((req, res, next) => {
    try {
      const contentType = req.headers["content-type"] || "";
      console.log("Processing request with Content-Type:", contentType);
      if (!contentType.startsWith("multipart/form-data")) {
        express.json({ limit: "10mb" })(req, res, (err) => {
          if (err) {
            console.error("express.json error:", err.message);
            return next(err);
          }
          express.urlencoded({ extended: true, limit: "10mb" })(req, res, next);
        });
      } else {
        next();
      }
    } catch (error) {
      console.error("Middleware error:", error.message);
      next(error);
    }
  });

  // Route dasar untuk testing
  app.get("/", (req, res) => {
    res.send("BE-diary-food is running!");
  });

  // Inisialisasi Passport
  console.log("Initializing Passport...");
  app.use(passport.initialize());
  passport.use("jwt", jwtStrategy);
  passport.use("google", googleStrategy);

  // Setup Swagger
  console.log("Setting up Swagger...");
  setupSwagger(app);

  // Rute API
  console.log("Applying API routes...");
  app.use("/v1", routes);

  // Handle 404
  app.use((req, res, next) => {
    console.log("404: Route not found:", req.originalUrl);
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
  });

  // Error handling
  app.use(errorConverter);
  app.use(errorHandler);

  console.log("App initialization completed successfully");
} catch (error) {
  console.error("Error initializing app.js:", error.message);
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Application initialization failed");
}

export default app;
