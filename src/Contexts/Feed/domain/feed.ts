import { FeedItem, ItemSource } from "./feedItem";

export type Feed = {
  [key in ItemSource]?: FeedItem[];
};
