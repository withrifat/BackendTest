import express from "express";
import { productRoutes } from "./modules/product/product.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Management System API is running",
    data: null,
  });
});

app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    data: null,
  });
});

app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in request body",
      data: null,
    });
  }
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    data: null,
  });
});

export default app;
