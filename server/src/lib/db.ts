import { Pool } from "pg";
import { config } from "../config/config.js";

export const pool = new Pool({
  connectionString: config.databaseUrl,
});

export async function checkDatabaseConnection(): Promise<void> {
  await pool.query("SELECT 1");
}
