import * as jwt from "jsonwebtoken";

interface ErrorExtended extends Error {
  statusCode?: number;
}

export default (req, res, next) => {
  let token = req.get("Authorization");

  token = token.split(" ")[1];
  console.log(token);

  if (!token) {
    const error: ErrorExtended = new Error("Not Authorized");
    error.statusCode = 401;
    throw error;
  }

  let decode;
  try {
    decode = jwt.verify(token, "SECRET_KEY");
  } catch (error) {
    console.log(error);
    error.message = "Not Authorized";
    error.statusCode = 401;
    throw error;
  }

  req.user = decode;
  next();
};
