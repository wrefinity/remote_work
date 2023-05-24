import jwt from "jsonwebtoken";
import customError from "../utils/errors.js";

export const AuthVerify = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(customError(401,"You are not authenticated!"))

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(customError(403,"Token is not valid!"))
    req.userId = payload.id;
    req.isWorker = payload.isWorker;
    next()
  });
};
