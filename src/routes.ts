import express, { Request, Response } from "express";
import { getClient } from "./db";
import { getDataWithSpecificFilter } from "./service";
import { MongoError } from "mongodb";

const dbName = process.env.DB_NAME || global.__MONGO_DB_NAME__;
const db = getClient().db(dbName);
const collection = db.collection("records");

const route = express.Router();

/**
 * Post route for endpoint /
 */
route.post("/", async (req: Request, res: Response) => {
  const { startDate, endDate, minCount, maxCount } = req.body;
  try {
    const document = await getDataWithSpecificFilter(
        minCount,
        maxCount,
        startDate,
        endDate,
        collection
      );
  
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
