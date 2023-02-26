import { RequestHandler } from "express";
import { ItemSource } from "Feed/domain/feedItem";
import { getFeedUseCase } from "../dependencyInjection";

export const getFeedController: RequestHandler = async (req, res, next) => {
  const date = req.query.date ? new Date(req.query.date as string) : new Date();
  const selectedSources = req.query.sources as ItemSource[];
  const getFeedResult = await getFeedUseCase.execute({ date, selectedSources });
  if (getFeedResult.isFailure()) {
    next(getFeedResult.error);
    return;
  }
  res.json(getFeedResult.value);
  return;
};
