import { FeedItem, ItemSourceValues } from "Feed/domain/feedItem";
import { Document, HydratedDocument, model, Schema } from "mongoose";

interface MongoFeedItem extends Omit<FeedItem, "id"> {
  itemId: string;
  url: string;
}

export type MongoFeedItemDocument = HydratedDocument<MongoFeedItem>;

const mongoFeedItemSchema = new Schema<MongoFeedItem>({
  date: { type: Date, required: true, index: true },
  description: { type: String, required: false },
  images: [{ type: String, required: true }],
  source: { type: String, enum: ItemSourceValues, required: true },
  url: { type: String, required: true },
  itemId: { type: String, required: true, unique: true },
});

const mongoFeedItemModel = model<MongoFeedItem>(
  "feedItem",
  mongoFeedItemSchema
);

export default mongoFeedItemModel;
