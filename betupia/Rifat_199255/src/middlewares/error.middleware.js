import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = statusCode === StatusCodes.INTERNAL_SERVER_ERROR ? "Internal Server Error" : err.message;

  if (err.code === "P2002") {
    statusCode = StatusCodes.CONFLICT;
    message = "A product with this SKU already exists";
  } else if (err.code === "P2025") {
    statusCode = StatusCodes.NOT_FOUND;
    message = "Product not found";
  } else if (err.code === "P2000" || err.code === "P2006" || err.code === "P2011" || err.code === "P2012") {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Invalid product data";
  }

  if (statusCode >= 500) console.error("Request failed:", err.message);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
