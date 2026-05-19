import express from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import authRoutes from "./routes/authRoutes.js";

/**
 * Initialize Express application with middleware
 */
export const createApp = () => {
  const app = express();

  // Middleware
  app.use(requestLogger);
  app.use(corsMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
  });

  // Auth routes
  app.use("/api/auth", authRoutes);

  // Task routes will be added here
  // app.use("/api/tasks", taskRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  });

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};
