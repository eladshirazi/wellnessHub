import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}
mongoose.connect(databaseUrl).then(() => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
});

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node Express!");
});

app.listen(process.env.PORT, () => {
  console.log("Example app listening at http://localhost:" + process.env.PORT);
});
