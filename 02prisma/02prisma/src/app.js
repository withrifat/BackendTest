import express from "express";

import studentRoutes from "./modules/student/student.route.js";

import notFound from "./middlewares/not-found.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// Global middleware
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student API is running",
  });
});

// API routes
app.use("/api/students", studentRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;