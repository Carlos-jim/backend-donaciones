import { createPool } from "mysql2/promise";

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "./config";

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: typeof DB_PORT === "string" ? parseInt(DB_PORT, 10) : DB_PORT,
  database: DB_DATABASE,
});
 