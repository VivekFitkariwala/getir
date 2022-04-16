import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI;

if (!url) {
  throw new Error("No mongo url provided");
}

const client = new MongoClient(url);

async function connect() {
  return client.connect();
}

/**
 * Export client and connect function
 */
export { client, connect };
