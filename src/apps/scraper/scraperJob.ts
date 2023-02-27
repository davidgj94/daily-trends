import axios, { Axios } from "axios";
import { CreateFeedItemUseCase } from "Feed/application/createFeedItem";
import { WebScraper } from "./scrapers/webScraper";

type ScraperJobConfig = { numPages: number };

export class ScraperJob {
  private axiosInstance: Axios;
  constructor(
    private webScraper: WebScraper,
    private jobConfig: ScraperJobConfig,
    private createItemUseCase: CreateFeedItemUseCase
  ) {
    this.axiosInstance = axios.create({ baseURL: webScraper.getBaseUrl() });
  }

  private async fetchPage(url?: string) {
    return this.axiosInstance.get(url || "").then(({ data }) => data);
  }

  public async run(): Promise<void> {
    const mainPageHtml = await this.fetchPage();
    const urls = this.webScraper.parseMainPage(mainPageHtml);

    let successfullyScrapedPages = 0;
    for (const url of urls) {
      try {
        const pageHtml = await this.fetchPage(url);
        console.log(this.webScraper.parsePage(pageHtml));
        const response = await this.createItemUseCase.execute({
          ...this.webScraper.parsePage(pageHtml),
          source: this.webScraper.getSource(),
          url: new URL(url, this.webScraper.getBaseUrl()).href,
        });
        if (response.isFailure()) {
          throw response.error;
        }
        successfullyScrapedPages += 1;
      } catch (error) {
        console.error(error);
      }
      if (successfullyScrapedPages === this.jobConfig.numPages) {
        break;
      }
    }
  }
}
