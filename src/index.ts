import "dotenv/config";
import express from "express";
import fs, { appendFile, appendFileSync } from "fs";
import path from "path";

const app = express();

app.use(express.json());

const PORT = parseInt(process.env.PORT || "3000");
const DATA_DIR = path.resolve("..", "data");

app.get("/", (_req, res) => {
  res.json({ message: "Hello from Docker + Express + TypeScript" });
});

app.get("/messages", (_req, res) => {
  res.json({
    message: "Hello from Docker + Express + TypeScript",
  });
});

app.post("/messages/create", (req, res, next) => {
  const text = req.body.text;

  if (typeof text !== "string" || text.trim() === "")
    res.status(400).json({ message: "Body text required" });
  else
    appendFile(path.join(DATA_DIR, "messages.txt"), `${text}\n`, (error) => {
      if (error) next(error);
      else res.json({ data: text, success: true });
    });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
