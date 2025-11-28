import express from "express";
import cors from 'cors';
import linksRouter from "./routes/links.js";
import healthRouter from "./routes/health.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use("/", healthRouter);
app.use("/api", linksRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
