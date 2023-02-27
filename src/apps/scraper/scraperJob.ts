import axios, { Axios } from "axios";
import { ScrapedData, WebScraper } from "./scrapers/webScraper";

type ScraperJobConfig = { numPages: number };

export class ScraperJob {
  private axiosInstance: Axios;
  constructor(
    private webScraper: WebScraper,
    private jobConfig: ScraperJobConfig
  ) {
    this.axiosInstance = axios.create({ baseURL: webScraper.getBaseUrl() });
  }

  private async fetchPage(url?: string) {
    return this.axiosInstance.get(url || "").then(({ data }) => data);
  }

  public async run(): Promise<(ScrapedData & { url: string })[]> {
    const mainPageHtml = await this.fetchPage();
    const urls = this.webScraper.parseMainPage(mainPageHtml);
    const scrapedData: (ScrapedData & { url: string })[] = [];
    for (const url of urls.splice(0, this.jobConfig.numPages)) {
      const pageHtml = await this.fetchPage(url);
      scrapedData.push({
        ...this.webScraper.parsePage(pageHtml),
        url: new URL(url, this.webScraper.getBaseUrl()).href,
      });
    }
    return scrapedData;
  }
}
