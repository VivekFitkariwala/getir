import { Db, MongoClient, ObjectId } from "mongodb";
import request from "supertest";
import { getClient, connect } from "../src/db";

jest.mock("../src/db", () => {
  let clientMock: MongoClient;
  async function connect() {
    clientMock = await MongoClient.connect(global.__MONGO_URI__).catch(
      (err) => err
    );
  }
  return {
    connect,
    getClient: () => clientMock,
  };
});

describe("[Integration test] Routes", () => {
  let db: Db;
  const COLLECTION_NAME = "records";

  beforeAll(async () => {
    await connect();
    db = await getClient().db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await getClient().close();
  });

  beforeEach(async () => {
    await db.collection(COLLECTION_NAME).deleteMany({});
  });
  test("Route should return result", async () => {
    const collection = db.collection(COLLECTION_NAME);
    await collection.insertMany([
      {
        _id: new ObjectId("5ee21587e07f053f990ceafd"),
        key: "hCXxyuAu",
        value: "hfJAfcGGizzJ",
        createdAt: new Date("2016-12-25T16:43:27.909+00:00"),
        counts: [25, 0, 0],
      },
      // This document should not be valid as is out by max amount
      {
        _id: new ObjectId("5ee21587e07f053f990ceafe"),
        key: "hCXxyzAu",
        value: "hfJAfcGGizzJ",
        createdAt: new Date("2016-12-25T16:43:27.909+00:00"),
        counts: [25, 25, 0],
      },
      // This document should not be out because of date filter
      {
        _id: new ObjectId("5ee21587e07f053f990ceaff"),
        key: "hCXxczAu",
        value: "hfJAfcGGizzJ",
        createdAt: new Date("2016-12-27T16:43:27.909+00:00"),
        counts: [25, 0, 0],
      },
    ]);
    const app = require("../src/app").default;
    const response = await request(app)
      .post("/")
      .send({
        startDate: new Date("2016-12-24T16:43:27.909+00:00"),
        endDate: new Date("2016-12-26T16:43:27.909+00:00"),
        minCount: 20,
        maxCount: 30,
      })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        code: 0,
        msg: "success",
        records: expect.arrayContaining([
          expect.objectContaining({
            key: "hCXxyuAu",
          }),
          expect.not.objectContaining({
            key: "hCXxczAu",
          }),
          expect.not.objectContaining({
            key: "hCXxyzAu",
          }),
        ]),
      })
    );
  });
});
