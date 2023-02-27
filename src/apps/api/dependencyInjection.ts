import { CreateFeedItemUseCase } from "Feed/application/createFeedItem";
import { GetFeedUseCase } from "Feed/application/getFeed";
import { UpdateFeedItemUseCase } from "Feed/application/updateFeedItem";
import { MongoFeedItemsRepository } from "Feed/infra/persistence/mongo/feedItemRepository";

const mongoFeedItemsRepository = new MongoFeedItemsRepository();
export const getFeedUseCase = new GetFeedUseCase(mongoFeedItemsRepository);
export const createItemUseCase = new CreateFeedItemUseCase(
  mongoFeedItemsRepository
);
export const updateItemUseCase = new UpdateFeedItemUseCase(
  mongoFeedItemsRepository
);
