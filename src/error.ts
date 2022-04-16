/**
 *  Global error handling functions 
 */

process
  .on("unhandledRejection", (reason) => {
    console.error(reason, "Unhandled Rejection at Promise");
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
