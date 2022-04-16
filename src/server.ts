import app from "./app";
import { client, connect } from "./db";

let server;
const port = 3000;
connect()
  .then((client) => {
    console.log("Monogo client connected");
    server = app
      .listen(port, () => console.log("Starting ExpressJS server on Port 3000"))
      .on("error", (err) => {
        client.close();
        throw err;
      });
  })
  .catch((err) => {
    client.close();
    throw err;
  });

export default server;
