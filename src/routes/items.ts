import { Router } from "express";
import { z } from "zod";
import db from "../db";
import {
  idSchema,
  itemCreateBodySchema,
  itemUpdateBodySchema,
} from "../schemas";
import type { TItem } from "../types";

const router = Router();

router.get("/", async (_req, res) => {
  const result = await db.query<TItem>("SELECT * FROM items ORDER BY id ASC");
  res.json({ count: result.rowCount, results: result.rows });
});

router.post("/", async (req, res) => {
  const parsedBody = itemCreateBodySchema.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(400).json({ error: z.treeifyError(parsedBody.error) });

  const result = await db.query<TItem>(
    `
    INSERT INTO items (label, description)
    VALUES ($1, $2)
    RETURNING *
    `,
    [parsedBody.data.label, parsedBody.data.description],
  );

  res.json(result.rows[0]);
});

router.patch("/:id", async (req, res) => {
  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success)
    return res.status(400).json({ error: z.treeifyError(parsedId.error) });

  const parsedBody = itemUpdateBodySchema.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(400).json({ error: z.treeifyError(parsedBody.error) });

  const result = await db.query<TItem>(
    `
    UPDATE items
    SET
      label = $2,
      description = $3
    WHERE id = $1
    RETURNING *
    `,
    [parsedId.data, parsedBody.data.label, parsedBody.data.description],
  );

  if (result.rowCount === 0)
    return res.status(404).json({ error: "Item not found" });

  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const parsedId = idSchema.safeParse(req.params.id);
  if (!parsedId.success)
    return res.status(400).json({ error: z.treeifyError(parsedId.error) });

  const result = await db.query<TItem>(
    `
    DELETE FROM items
    WHERE id = $1
    RETURNING *
    `,
    [parsedId.data],
  );

  if (result.rowCount === 0)
    return res.status(404).json({ error: "Item not found" });

  res.json({ deleted: result.rows[0] });
});

export default router;
