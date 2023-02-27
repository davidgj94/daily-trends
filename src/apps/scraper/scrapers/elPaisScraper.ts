import cheerio from "cheerio";
import { WebScraper } from "./webScraper";

const BASE_URL = "https://elpais.com/";

export class ElPaisScraper implements WebScraper {
  getBaseUrl(): string {
    return BASE_URL;
  }

  parseMainPage(html: any): string[] {
    const $ = cheerio.load(html);
    const urls: string[] = [];
    $('h2[class="c_t "] a').each((index, el) => {
      urls.push((el as any).attribs.href as string);
    });
    return urls;
  }

  parsePage(html: any): {
    date: Date;
    images: string[];
    description?: string | undefined;
  } {
    const $ = cheerio.load(html);
    const description = $('h1[class="a_t"]').text();
    const images = [
      $('figure[class="a_m a_m-h"] img').attr()["srcset"].split(" ")[0],
    ];
    const date = new Date($("time").attr()["datetime"]);
    return { description, images, date };
  }
}
