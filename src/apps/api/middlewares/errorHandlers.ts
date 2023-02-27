import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";

export const notFoundMiddleware: RequestHandler = async (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json(`${req.url} not found`);
  next();
};
