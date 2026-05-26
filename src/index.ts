import "dotenv/config";
import express from "express";
import itemsRouter from "./routes/items";

const PORT = parseInt(process.env.PORT || "3000");

const app = express();

app.use(express.json());
app.use("/items", itemsRouter);

app.get("/", (_req, res) => {
  res.send("Welcome to Express Sandbox App");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
