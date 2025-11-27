import express from "express";
import { pool } from "./db.js";
import linksRouter from "./routes/links.js";
import healthRouter from "./routes/health.js";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/", healthRouter);
app.use("/api", linksRouter);

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
