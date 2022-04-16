import express, { Request, Response } from "express";
import { client } from "./db";
import { MongoError } from "mongodb";
import { getAgg } from "./data";

const dbName = "getir-case-study";
const db = client.db(dbName);
const collection = db.collection("records");

const route = express.Router();

/**
 * Post route for endpoint /
 */
route.post("/", async (req: Request, res: Response) => {
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
  } catch (err) {
    const error = err as MongoError;
    res.statusCode = 400;
    res.json({
      code: error.code,
      msg: error.name,
    });
  }
});

/**
 * Exporting route here
 */
export { route };
