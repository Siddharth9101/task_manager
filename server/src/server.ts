import { createApp } from "./app.js";
import { config } from "./config/config.js";
import { checkDatabaseConnection } from "./lib/db.js";
import { logger } from "./lib/logger.js";
import { connectRedis, disconnectRedis } from "./lib/redis.js";

const app = createApp();

async function startServer() {
  try {
    await checkDatabaseConnection();
    logger.info("database connection established");

    await connectRedis();

    app.listen(config.port, () => {
      logger.info(
        `server is now running on http://localhost:${config.port}/docs`,
      );
    });
  } catch (err) {
    logger.error({ err }, "database connection failed; exiting");
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await disconnectRedis();
  process.exit(0);
});

startServer();
