import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { router as carRoutes } from "./src/routes/carRoutes";
import { router as userRoutes } from "./src/routes/userRoutes";
import { corsMiddleware } from "./src/utils/cors";

const app = express();
app.use(express.json());
app.use(corsMiddleware);

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
app.use("/api/v1/cars", carRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
