import { RequestHandler } from "express";
import { ItemSource } from "Feed/domain/feedItem";
import { StatusCodes } from "http-status-codes";
import { createItemUseCase, getFeedUseCase } from "../dependencyInjection";

export const createItemController: RequestHandler = async (req, res) => {
  const createResponse = await createItemUseCase.execute(req.body);
  if (createResponse.isFailure()) {
    switch (createResponse.error.type) {
      case "FailedWriteError":
        res.status(StatusCodes.BAD_REQUEST).json(createResponse.error.message);
        break;
      default:
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(createResponse.error.message);
        break;
    }
    return;
  }
  res.status(StatusCodes.CREATED).json({ id: createResponse.value });
};
