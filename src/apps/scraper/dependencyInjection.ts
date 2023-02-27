import { CreateFeedItemUseCase } from "Feed/application/createFeedItem";
import { GetFeedUseCase } from "Feed/application/getFeed";
import { UpdateFeedItemUseCase } from "Feed/application/updateFeedItem";
import { MongoFeedItemsRepository } from "Feed/infra/persistence/mongo/feedItemRepository";
import { ScraperJob } from "./scraperJob";
import { ElPaisScraper } from "./scrapers/elPaisScraper";
import config from "./config";

const mongoFeedItemsRepository = new MongoFeedItemsRepository();
export const createItemUseCase = new CreateFeedItemUseCase(
  mongoFeedItemsRepository
);

const elPaisScraper = new ElPaisScraper();
export const elPaisScraperJob = new ScraperJob(elPaisScraper, {
  numPages: config.numPages,
});
