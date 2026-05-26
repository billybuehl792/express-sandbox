import "dotenv/config";
import express from "express";
import { Pool } from "pg";

const PORT = parseInt(process.env.PORT || "3000");

const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const app = express();
app.use(express.json());

const db = new Pool({ connectionString: POSTGRES_DB_URL });

app.get("/", async (_req, res) => {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  res.json({ results: result.rows });
});

app.post("/", async (req, res) => {
  const { label, description } = req.body;

  const result = await db.query(
    `
    INSERT INTO items (label, description)
    VALUES ($1, $2)
    RETURNING *
    `,
    [label, description],
  );

  res.json(result.rows[0]);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
