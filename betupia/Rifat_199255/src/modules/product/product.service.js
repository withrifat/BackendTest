
import prisma from "../../lib/prisma.js";

const createProduct = async (data) => {
  return prisma.product.create({ data });
};

const getAllProducts = async () => {
  return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
};

const getSingleProduct = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) throw Object.assign(new Error("Product not found"), { statusCode: 404 });
  return product;
};

const updateProduct = async (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

const deleteProduct = async (id) => {
  return prisma.product.delete({
    where: { id },
  });
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
