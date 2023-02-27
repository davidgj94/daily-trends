import cheerio from "cheerio";
import { ItemSource } from "Feed/domain/feedItem";
import { ScrapedData, WebScraper } from "./webScraper";

const BASE_URL = "https://www.elmundo.es";

export class ElMundoScraper implements WebScraper {
  getSource(): ItemSource {
    return "elMundo";
  }
  getBaseUrl(): string {
    return BASE_URL;
  }
  parseMainPage(html: any): string[] {
    const $ = cheerio.load(html);
    const urls: string[] = [];
    $("header[class=ue-c-cover-content__headline-group] a").each(
      (index, el) => {
        urls.push((el as any).attribs.href as string);
      }
    );
    return urls
      .filter((url) => url.includes(BASE_URL))
      .map((url) => url.replace(BASE_URL, ""));
  }
  parsePage(html: any): ScrapedData {
    const $ = cheerio.load(html);
    const description = $('h1[class^="ue-c-article__headline"]').text();
    const images = [$("img[class=ue-c-article__image]").attr()?.["src"]].filter(
      Boolean
    );
    const date = new Date(
      $('div[class="ue-c-article__publishdate"] time').attr()["datetime"]
    );
    return { description, images, date };
  }
}
