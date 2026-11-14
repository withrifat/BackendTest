import productService from "./product.service.js";

const PRISMA_ERRORS = {
  P2002: { statusCode: 409, message: "SKU already exists. SKU must be unique." },
  P2023: { statusCode: 400, message: "Invalid product id format" },
  P2025: { statusCode: 404, message: "Product not found" },
};

const sendError = (res, error) => {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ success: false, message: error.message, data: null });
  }
  const prismaError = PRISMA_ERRORS[error.code];
  if (prismaError) {
    return res
      .status(prismaError.statusCode)
      .json({ success: false, message: prismaError.message, data: null });
  }
  console.error(error);
  return res.status(500).json({ success: false, message: "Internal server error", data: null });
};

const handle = (statusCode, message, action) => async (req, res) => {
  try {
    const data = await action(req);
    return res.status(statusCode).json({ success: true, message, data });
  } catch (error) {
    return sendError(res, error);
  }
};

export const productController = {
  createProduct: handle(201, "Product created successfully", (req) =>
    productService.createProduct(req.body)
  ),
  getAllProducts: handle(200, "Products retrieved successfully", (req) =>
    productService.getAllProducts(req.query)
  ),
  getSingleProduct: handle(200, "Product retrieved successfully", (req) =>
    productService.getSingleProduct(req.params.id)
  ),
  updateProduct: handle(200, "Product updated successfully", (req) =>
    productService.updateProduct(req.params.id, req.body)
  ),
  replaceProduct: handle(200, "Product replaced successfully", (req) =>
    productService.replaceProduct(req.params.id, req.body)
  ),
  deleteProduct: handle(200, "Product deleted successfully", (req) =>
    productService.deleteProduct(req.params.id)
  ),
};
