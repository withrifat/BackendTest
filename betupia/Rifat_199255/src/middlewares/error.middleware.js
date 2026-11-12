
import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message =
    statusCode >= 500
      ? "Internal Server Error"
      : err.message || "Something went wrong";

  if (err.code === "P2002") {
    statusCode = StatusCodes.CONFLICT;
    const field = err.meta?.target?.[0] || "Field";
    message = `${field} already exists`;
  } else if (err.code === "P2025") {
    statusCode = StatusCodes.NOT_FOUND;
    message = "Requested resource not found";
  } else if (
    ["P2000", "P2006", "P2011", "P2012"].includes(err.code)
  ) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Invalid data provided";
  }

  if (statusCode >= 500) {
    console.error("Request failed:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
