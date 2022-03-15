import { validationResult } from "express-validator";

interface ErrorExtended extends Error {
  statusCode?: number;
  errors?: object[];
}

const handleErrors = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    const error: ErrorExtended = new Error(errors[0].msg);
    error.errors = errors;
    error.statusCode = 400;
    return next(error);
  }

  next();
};

export default handleErrors;
