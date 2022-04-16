process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

process.once("SIGUSR2", function () {
  console.log("Shutting Down!");
  process.kill(process.pid, "SIGUSR2");
});
