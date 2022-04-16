import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir case-study?retryWrites=true";

const client = new MongoClient(url);

async function connect() {
    return client.connect();
}

export { client, connect };
