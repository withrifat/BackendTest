import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;