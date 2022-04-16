import { Collection, Document } from "mongodb";
import { getAgg } from "./data";

export async function getDataWithSpecificFilter(
  minCount: number,
  maxCount: number,
  startDate: Date,
  endDate: Date,
  collection: Collection<Document>
) {
  const agg = getAgg(
    minCount,
    maxCount,
    new Date(startDate),
    new Date(endDate)
  );
  const document = [];

  for await (let doc of collection.aggregate(agg)) {
    document.push(doc);
  }
  return document;
}
