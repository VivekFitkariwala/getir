import { Server } from "http";
import app from "./app";
import { client, connect } from "./db";
import "./error";

let server: Server;
const port = 3000;

/**
 * Connect to database
 * Start the server
 */
connect()
  .then((client) => {
    console.log("Mongo database connected");
    server = app
      .listen(port, () =>
        console.log(`Starting ExpressJS server on Port ${port}`)
      )
      .on("error", (err) => {
        /**
         * Close the database connection
         * and throw error for closing the node process
         */
        client.close();
        throw err;
      });
  })
  .catch((err) => {
    /**
     * Close the database connection
     * and throw error for closing the node process
     */
    client.close();
    throw err;
  });
