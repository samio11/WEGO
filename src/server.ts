import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.DATABASE as string);
    server = app.listen(config.PORT, () => {
      console.log(`Server Runs On:- ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

(async () => {
  await main();
})();

process.on("unhandledRejection", (err) => {
  console.log(`UnHandled Rejection:- ${err}`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.log(`UnCaught Exception:- ${err}`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGTERM", () => {
  console.log(`SIGNAL TERMINATION!!!`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
