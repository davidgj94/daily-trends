import { Document, HydratedDocument, model, Schema } from "mongoose";

interface MongoFeedItem {
  itemId: string;
  url: string;
}

export type MongoFeedItemDocument = HydratedDocument<MongoFeedItem>;

const mongoFeedItemSchema = new Schema<MongoFeedItem>({
  url: { type: String, required: true },
  itemId: { type: String, required: true, unique: true },
});

const mongoFeedItemModel = model<MongoFeedItem>(
  "feedItem",
  mongoFeedItemSchema
);

export default mongoFeedItemModel;
