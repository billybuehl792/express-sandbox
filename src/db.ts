import { Pool } from "pg";

const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

const POSTGRES_DB_URL =
  POSTGRES_HOST &&
  POSTGRES_USER &&
  POSTGRES_PORT &&
  POSTGRES_DB &&
  POSTGRES_PASSWORD
    ? `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`
    : undefined;

const db = new Pool({ connectionString: POSTGRES_DB_URL });

export default db;
