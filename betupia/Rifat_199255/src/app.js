
import express from "express";
import cors from "cors";

import notFoundMiddleware from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

import productRoutes from "./modules/product/product.route.js";
import authorRouter from "./modules/author/author.route.js";
import bookRouter from "./modules/book/book.route.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Management API is running",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/authors", authorRouter);
app.use("/api/authors", bookRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
