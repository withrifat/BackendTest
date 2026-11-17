import { StatusCodes } from "http-status-codes";
import { ProductService } from "./product.service.js";

const createProduct = async (req, res) => {
  const product = await ProductService.createProduct(req.body);
  res.status(StatusCodes.CREATED).json({ success: true, message: "Product created successfully", data: product });
};

const getAllProducts = async (req, res) => {
  const products = await ProductService.getAllProducts();
  res.status(StatusCodes.OK).json({ success: true, message: "Products retrieved successfully", data: products });
};

const getSingleProduct = async (req, res) => {
  const product = await ProductService.getSingleProduct(req.params.id);
  res.status(StatusCodes.OK).json({ success: true, message: "Product retrieved successfully", data: product });
};

const updateProduct = async (req, res) => {
  const product = await ProductService.updateProduct(req.params.id, req.body);
  res.status(StatusCodes.OK).json({ success: true, message: "Product updated successfully", data: product });
};

const replaceProduct = async (req, res) => {
  const product = await ProductService.updateProduct(req.params.id, req.body);
  res.status(StatusCodes.OK).json({ success: true, message: "Product replaced successfully", data: product });
};

const deleteProduct = async (req, res) => {
  await ProductService.deleteProduct(req.params.id);
  res.status(StatusCodes.OK).json({ success: true, message: "Product deleted successfully" });
};

export const ProductController = { createProduct, getAllProducts, getSingleProduct, updateProduct, replaceProduct, deleteProduct };
