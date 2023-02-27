import { startDB } from "Shared/infra/persistence/mongo/init";
import { elMundoScraperJob, elPaisScraperJob } from "./dependencyInjection";

const SCRAPER_JOBS = [elMundoScraperJob, elPaisScraperJob];

startDB().then(async () => {
  await Promise.all(SCRAPER_JOBS.map(async (job) => await job.run()));
  console.log("Done");
});
