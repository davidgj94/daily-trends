import { StatusCodes } from "http-status-codes";
import { ErrorRequestHandler, RequestHandler } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnexpectedError,
} from "Shared/domain/error";

const mapError = (error: NotFoundError | UnexpectedError | BadRequestError) => {
  switch (error.type) {
    case "NotFound":
      return StatusCodes.NOT_FOUND;
    case "BadRequestError":
      return StatusCodes.BAD_REQUEST;
    default:
      return StatusCodes.INTERNAL_SERVER_ERROR;
  }
};

export const errorHandler: ErrorRequestHandler = (err: any, req, res) => {
  res.status(mapError(err)).json(err.message);
};

export const notFoundMiddleware: RequestHandler = async (req, res, next) => {
  const err = new NotFoundError(new Error(`${req.url} not found`));
  next(err);
};
