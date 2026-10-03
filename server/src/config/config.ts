import dotenv from "dotenv";
dotenv.config();

function checkRequiredEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env variable for ${value}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 8000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: (process.env.NODE_ENV ?? "development") === "production",
  logLevel: process.env.LOG_LEVEL ?? "info",
  databaseUrl: checkRequiredEnvVariable("DATABASE_URL"),
};
