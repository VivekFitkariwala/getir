import express from "express";
import { addMiddleware } from "./middleware";
import { route } from "./routes";

const app = express();
addMiddleware(app);

app.use("/", route);

/**
 * Express app
 */
export default app;
