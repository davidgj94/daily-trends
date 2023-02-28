import { closeDB, startDB } from "Shared/infra/persistence/mongo/init";
import { elMundoScraperJob, elPaisScraperJob } from "./dependencyInjection";
import { schedule } from "node-cron";

const SCRAPER_JOBS = [elMundoScraperJob, elPaisScraperJob];

const runAllJobs = () =>
  startDB()
    .then(async () => {
      await Promise.all(SCRAPER_JOBS.map(async (job) => await job.run()));
      console.log("Done");
    })
    .then(closeDB);

schedule("*/2 * * * *", runAllJobs);
