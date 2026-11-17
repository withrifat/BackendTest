import express from "express";
import { productController } from "./product.controller.js";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);
router.patch("/:id", productController.updateProduct);
router.put("/:id", productController.replaceProduct);
router.delete("/:id", productController.deleteProduct);

export const productRoutes = router;
