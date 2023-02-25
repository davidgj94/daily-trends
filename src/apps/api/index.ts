import express from "express";
import cors from "cors";
import http from "http";

import router from "./routes";
import config from "./config";
import { errorHandler, notFoundMiddleware } from "./middlewares/errorHandlers";
import { startDB } from "../../Contexts/Shared/infra/init";

// Init express
const app = express();
const server = http.createServer(app);

// Add middlewares
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/", router);

// Catch 404 and forward to error handler
app.use(notFoundMiddleware);

// Add error handler
app.use(errorHandler);

(async () => {
  await startDB();
  server.listen(config.serverPort, () => {
    console.log(`Server listening at ${config.serverPort}`);
  });

  server.on("error", () => {});
})();

export default app;
