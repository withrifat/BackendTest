
import { Router } from "express";
import { ProductController } from "./product.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createProductSchema, productIdSchema, replaceProductSchema, updateProductSchema } from "./product.validation.js";

const router = Router();
const validateId = validate(productIdSchema, "params");

router.post("/", validate(createProductSchema), ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", validateId, ProductController.getSingleProduct);
router.patch("/:id", validateId, validate(updateProductSchema), ProductController.updateProduct);
router.put("/:id", validateId, validate(replaceProductSchema), ProductController.replaceProduct);
router.delete("/:id", validateId, ProductController.deleteProduct);

export default router;
