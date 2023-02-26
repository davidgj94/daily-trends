import { GetFeedUseCase } from "Feed/application/getFeed";
import { MongoFeedItemsRepository } from "Feed/infra/persistence/mongo/feedItemRepository";

const mongoFeedItemsRepository = new MongoFeedItemsRepository();
export const getFeedUseCase = new GetFeedUseCase(mongoFeedItemsRepository);
