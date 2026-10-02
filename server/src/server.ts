import { createApp } from "./app.js";
import { config } from "./config/config.js";
import { logger } from "./lib/logger.js";

const app = createApp();

app.listen(config.port, () => {
  logger.info(`server is now running on http://localhost:${config.port}`);
});
