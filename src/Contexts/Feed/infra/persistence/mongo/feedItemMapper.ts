import { FeedItem } from "Feed/domain/feedItem";
import { PersistenceDataMapper } from "Shared/infra/persistence/persistenceMapper";
import { MongoFeedItemDocument } from "./feedItem";

export const mongoFeedItemMapper: PersistenceDataMapper<
  FeedItem,
  MongoFeedItemDocument
> = (data) => ({
  id: data.itemId,
  url: data.url,
  date: data.date,
  images: data.images,
  source: data.source,
  description: data.description,
});
