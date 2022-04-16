import { MongoClient } from "mongodb";

let client: MongoClient;

async function connect() {
  const url = process.env.MONGO_URI;
  if (!url) {
    throw new Error("No mongo url provided");
  }
  client == new MongoClient(url);
  return client.connect();
}

function getClient() {
  return client;
}

/**
 * Export client and connect function
 */
export { getClient, connect };
