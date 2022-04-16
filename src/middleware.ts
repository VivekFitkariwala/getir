import express, { Express } from "express";
import compression from "compression";
import helmet from "helmet";

/**
 * Add middleware for express app
 * @param {Express} app - Express app
 */
export function addMiddleware(app: Express) {
  app.use(express.json());
  app.use(helmet()); // set well-known security-related HTTP headers
  app.use(compression());
}
