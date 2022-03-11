import jwt from "jsonwebtoken";

interface ErrorExtended extends Error {
  statusCode?: number;
}

export default (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    const error: ErrorExtended = new Error("Not Authorized");
    error.statusCode = 401;
    throw error;
  }

  let decode;
  try {
    decode = jwt.verify(token, "JWT_SECRET");
  } catch (error) {
    error.message = "Not Authorized";
    error.statusCode = 401;
    throw error;
  }

  req.user = decode;
  next();
};
