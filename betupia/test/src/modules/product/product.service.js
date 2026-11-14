import prisma from "../../lib/prisma.config.js";

const REQUIRED_FIELDS = ["name", "description", "price", "category", "brand", "stockQuantity", "sku"];
const TEXT_FIELDS = ["name", "description", "category", "brand", "sku"];
const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const assertValidId = (id) => {
  if (!OBJECT_ID_PATTERN.test(id)) {
    throw createError(400, "Invalid product id format");
  }
};

const assertNoMissingFields = (payload, messagePrefix) => {
  const missingFields = REQUIRED_FIELDS.filter(
    (field) => payload[field] === undefined || payload[field] === null || payload[field] === ""
  );
  if (missingFields.length > 0) {
    throw createError(400, `${messagePrefix}${missingFields.join(", ")}`);
  }
};

const toNumber = (value) => (typeof value === "string" && value.trim() !== "" ? Number(value) : value);

const sanitizePayload = (payload) => {
  const data = {};

  for (const field of TEXT_FIELDS) {
    if (payload[field] === undefined) continue;
    if (typeof payload[field] !== "string" || payload[field].trim() === "") {
      throw createError(400, `${field} must be a non-empty string`);
    }
    data[field] = payload[field].trim();
  }

  if (payload.price !== undefined) {
    const price = toNumber(payload.price);
    if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
      throw createError(400, "price must be a number >= 0");
    }
    data.price = price;
  }

  if (payload.stockQuantity !== undefined) {
    const stockQuantity = toNumber(payload.stockQuantity);
    if (typeof stockQuantity !== "number" || !Number.isInteger(stockQuantity) || stockQuantity < 0) {
      throw createError(400, "stockQuantity must be a whole number >= 0");
    }
    data.stockQuantity = stockQuantity;
  }

  return data;
};

const createProduct = async (payload = {}) => {
  assertNoMissingFields(payload, "Missing fields: ");
  const data = sanitizePayload(payload);
  return prisma.product.create({ data });
};

const getAllProducts = async (filters = {}) => {
  const where = {};
  if (filters.category) where.category = filters.category;
  if (filters.brand) where.brand = filters.brand;
  return prisma.product.findMany({ where, orderBy: { createdAt: "desc" } });
};

const getSingleProduct = async (id) => {
  assertValidId(id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    throw createError(404, "Product not found");
  }
  return product;
};

const updateProduct = async (id, payload = {}) => {
  assertValidId(id);
  const data = sanitizePayload(payload);
  if (Object.keys(data).length === 0) {
    throw createError(400, "Send at least one field to update");
  }
  return prisma.product.update({ where: { id }, data });
};

const replaceProduct = async (id, payload = {}) => {
  assertValidId(id);
  assertNoMissingFields(payload, "PUT requires all fields. Missing: ");
  const data = sanitizePayload(payload);
  return prisma.product.update({ where: { id }, data });
};

const deleteProduct = async (id) => {
  assertValidId(id);
  return prisma.product.delete({ where: { id } });
};

export default {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  replaceProduct,
  deleteProduct,
};
