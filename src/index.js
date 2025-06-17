import app from "./app.js";
import config from "./config/config.js";
import logger from "./config/logger.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function startServer() {
  try {
    console.log("Attempting to connect to database with URL:", config.database.url);
    await prisma.$connect();
    logger.info("Connected to Database");

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    logger.error("Failed to connect to Database:", error.message);
    app.use((req, res, next) => {
      res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: error.message,
      });
    });
  }

  logger.info("Server initialized, running in serverless mode");
}

startServer().catch((error) => {
  logger.error("Failed to start server:", error.message);
});

export default app;
