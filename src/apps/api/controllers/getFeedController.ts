import { RequestHandler } from "express";
import { ItemSource } from "Feed/domain/feedItem";
import { StatusCodes } from "http-status-codes";
import { getFeedUseCase } from "../dependencyInjection";

export const getFeedController: RequestHandler = async (req, res) => {
  const date = req.query.date ? new Date(req.query.date as string) : new Date();
  const selectedSources = req.query.sources as ItemSource[];
  const getFeedResult = await getFeedUseCase.execute({ date, selectedSources });
  if (getFeedResult.isFailure()) {
    switch (getFeedResult.error.type) {
      case "NotFound":
        res.status(StatusCodes.NOT_FOUND).json(getFeedResult.error.message);
        break;
      default:
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(getFeedResult.error.message);
        break;
    }
    return;
  }
  res.json(getFeedResult.value);
  return;
};
