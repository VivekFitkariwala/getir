import { getDataWithSpecificFilter } from "./service";
import { Db, MongoClient, ObjectId } from "mongodb";

describe("[Unit Test] Service.ts ", () => {
  let connection: MongoClient;
  let db: Db;
  const COLLECTION_NAME = "getir-case-study";

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__).catch(
      (err) => err
    );
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await db.collection(COLLECTION_NAME).deleteMany({});
  });

  test("Function should return valid document", async () => {
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
    const data = await getDataWithSpecificFilter(
      20,
      30,
      new Date("2016-12-24T16:43:27.909+00:00"),
      new Date("2016-12-26T16:43:27.909+00:00"),
      collection
    );

    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "hCXxyuAu",
        }),
      ])
    );

    expect(data).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "hCXxczAu",
        }),
      ])
    );

    // document should be out becuse of date
    expect(data).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "hCXxyzAu",
        }),
      ])
    );
  });
});
