import { validationResult } from "express-validator";

const handleErrors = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    const error = new Error(errors[0].msg);
    error.errors = errors;
    error.statusCode = 400;
    return next(error);
  }

  next();
};

export default handleErrors;
