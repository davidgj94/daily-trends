import { FeedItem, ItemSource } from "Feed/domain/feedItem";

export type ScrapedData = Pick<FeedItem, "date" | "description" | "images">;

export interface WebScraper {
  getBaseUrl(): string;
  getSource(): ItemSource;
  parseMainPage(html: any): string[];
  parsePage(html: any): ScrapedData;
}
