import { FeedItem } from "src/Contexts/Feed/domain/feedItem";
import { PersistenceDataMapper } from "src/Contexts/Shared/infra/persistence/persistenceMapper";
import { MongoFeedItemDocument } from "./feedItem";

export const mongoFeedItemMapper: PersistenceDataMapper<
  FeedItem,
  MongoFeedItemDocument
> = (data) => ({ id: data.itemId, url: data.url });
