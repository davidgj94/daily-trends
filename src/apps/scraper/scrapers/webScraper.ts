import { FeedItem } from "Feed/domain/feedItem";

export type ScrapedData = Pick<FeedItem, "date" | "description" | "images">;

export interface WebScraper {
  getBaseUrl(): string;
  parseMainPage(html: any): string[];
  parsePage(html: any): ScrapedData;
}
