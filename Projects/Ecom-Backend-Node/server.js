const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./backend/config/config.env" });

const connectDatabase = require("./config/database");

connectDatabase();
//handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
