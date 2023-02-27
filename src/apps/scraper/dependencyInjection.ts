import { CreateFeedItemUseCase } from "Feed/application/createFeedItem";
import { GetFeedUseCase } from "Feed/application/getFeed";
import { UpdateFeedItemUseCase } from "Feed/application/updateFeedItem";
import { MongoFeedItemsRepository } from "Feed/infra/persistence/mongo/feedItemRepository";
import { ScraperJob } from "./scraperJob";
import { ElPaisScraper } from "./scrapers/elPaisScraper";
import config from "./config";
import { ElMundoScraper } from "./scrapers/elMundoScraper";

const mongoFeedItemsRepository = new MongoFeedItemsRepository();
export const createItemUseCase = new CreateFeedItemUseCase(
  mongoFeedItemsRepository
);

const elPaisScraper = new ElPaisScraper();
const elMundoScraper = new ElMundoScraper();
export const elPaisScraperJob = new ScraperJob(
  elPaisScraper,
  {
    numPages: config.numPages,
  },
  createItemUseCase
);

export const elMundoScraperJob = new ScraperJob(
  elMundoScraper,
  {
    numPages: config.numPages,
  },
  createItemUseCase
);
