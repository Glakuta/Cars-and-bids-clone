import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router as userRoutes } from "./src/routes/userRoutes";

const app = express();
dotenv.config({ path: "./.env" });
const port = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/v1/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
