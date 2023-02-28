import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { updateItemUseCase } from "../dependencyInjection";

export const updateItemController: RequestHandler = async (req, res) => {
  const updateResponse = await updateItemUseCase.execute({
    id: req.params.id,
    updates: req.body,
  });
  if (updateResponse.isFailure()) {
    switch (updateResponse.error.type) {
      case "FailedWriteError":
        res.status(StatusCodes.BAD_REQUEST).json(updateResponse.error.message);
        break;
      case "NotFound":
        res.status(StatusCodes.NOT_FOUND).json(updateResponse.error.message);
        break;
      default:
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(updateResponse.error.message);
        break;
    }
    return;
  }
  res.status(StatusCodes.OK).json(updateResponse.value);
};
