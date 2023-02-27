import { startDB } from "Shared/infra/persistence/mongo/init";
import { createItemUseCase } from "../api/dependencyInjection";
import { elPaisScraperJob } from "./dependencyInjection";
import { ItemSource } from "Feed/domain/feedItem";
import { CreateItemRequest } from "Feed/application/createFeedItem";
import { ScraperJob } from "./scraperJob";

const SCRAPER_JOBS = new Map<ItemSource, ScraperJob>();
SCRAPER_JOBS.set("elPais", elPaisScraperJob);

startDB().then(async () => {
  const items: CreateItemRequest[] = [];
  for (const [source, job] of SCRAPER_JOBS.entries()) {
    const results = await job.run();
    items.push(...results.map((data) => ({ ...data, source })));
  }

  console.log(items);
  await Promise.all(
    items.map(async (item) => {
      const response = await createItemUseCase.execute(item);
      if (response.isFailure()) console.error(response.error);
    })
  );
  console.log("Done");
});
