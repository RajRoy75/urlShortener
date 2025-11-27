import express from "express";
import { pool } from "../db.js";
import { generateCode } from "../util/generateCode.js";
import { validateURL, validateCode } from "../util/validate.js";

const router = express.Router();

router.post("/links", async (req, res) => {
  const { target_url, code } = req.body;

  if (!validateURL(target_url))
    return res.status(400).json({ error: "Invalid URL" });

  // If custom code not given → generate random 6–8 chars
  const randomLength = Math.floor(Math.random() * 3) + 6; // 6,7,8
  const finalCode = code || generateCode(randomLength);

  if (code && !validateCode(code))
    return res.status(400).json({ error: "Invalid code format" });

  try {
    await pool.query(
      `INSERT INTO links (code, target_url)
       VALUES ($1, $2)`,
      [finalCode, target_url]
    );

    return res.status(201).json({
      code: finalCode,
      target_url,
      total_clicks: 0,
      last_clicked_at: null,
      created_at: new Date()
    });

  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Code already exists" });
    throw err;
  }
});

router.get("/links", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT code, target_url, total_clicks,
             last_clicked_at, created_at
      FROM links
      WHERE deleted = false
      ORDER BY created_at DESC
    `);

    return res.status(200).json(result.rows);

  } catch (err) {
    console.error("Error fetching links:", err);
    return res.status(500).json({ error: "Server error fetching links" });
  }
});

router.get("/links/:code", async (req, res) => {
  const { code } = req.params;

  const result = await pool.query(
    `UPDATE links
     SET total_clicks = total_clicks + 1,
         last_clicked_at = now()
     WHERE code = $1 AND deleted = false
     RETURNING target_url`,
    [code]
  );

  if (result.rowCount === 0) {
    return res.status(404).send("Link not found");
  }

  return res.redirect(302, result.rows[0].target_url);
});

router.delete("/links/:code", async (req, res) => {
  const { code } = req.params;

  try {
    await pool.query(
      `UPDATE links SET deleted = true WHERE code = $1`,
      [code]
    );

    return res.status(204).send();

  } catch (err) {
    console.error("Error deleting link:", err);
    return res.status(500).json({ error: "Server error deleting link" });
  }
});

export default router;
