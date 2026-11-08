import { StatusCodes } from "http-status-codes";

const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API route not found",
  });
};

export default notFound;