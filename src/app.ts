import express, { Request, Response } from "express";
import { client } from "./db";
import compression from "compression";
import helmet from "helmet";
import { getAgg } from "./data";

const app = express();

app.use(express.json());
app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());

app.get("/", (req: Request, res: Response) =>
  res.send("Hello World from app.ts!")
);

app.post("/", async (req: Request, res: Response) => {
  const dbName = "getir-case-study";
  const db = client.db(dbName);
  const collection = db.collection("records");
  const { startDate, endDate, minCount, maxCount } = req.body;
  const agg = getAgg(
    minCount,
    maxCount,
    new Date(startDate),
    new Date(endDate)
  );
  const document = [];
  try {
    for await (let doc of collection.aggregate(agg)) {
      document.push(doc);
    }
    res.json({
      code: 0,
      msg: "success",
      records: document,
    });
  } catch (error) {
    res.json({
      code: 1,
      msg: "fail"
    });
  }
});

export default app;
