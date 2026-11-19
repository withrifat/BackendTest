import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import { HealthRoutes } from "./routes/health.route.js";
// import { userRoutes } from "./modules/user/user.routes.js";

const app: Application = express();

// Security headers
app.use(helmet());

// CORS
app.use(cors());

// HTTP request logger
app.use(morgan("dev"));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.use("/api/health", HealthRoutes);

// API routes
// app.use("/api/v1/users", userRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
