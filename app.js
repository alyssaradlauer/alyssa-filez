import express from "express";
import foldersRouter from "./api/folders.js";
import filesRouter from "./api/files.js";
const app = express();
export default app;

app.use(express.json());

app.use("/folders", foldersRouter);

app.use("/files", filesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});
