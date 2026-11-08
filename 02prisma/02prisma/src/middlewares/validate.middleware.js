import { StatusCodes } from "http-status-codes";

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues,
    });
  }

  req.body = result.data;
  next();
};

export default validate;