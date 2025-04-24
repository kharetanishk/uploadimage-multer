const express = require("express");
const app = express();

const port = 6262;
const mongoose = require("mongoose");
const path = require("path");
const { uploadRouter } = require("./Routers/upload");
require("dotenv").config();
const mongourl = process.env.MONGO_URL;

app.use("/upload", uploadRouter);

app.use("/public", express.static(path.join(__dirname, "public")));

async function main() {
  await mongoose
    .connect(mongourl)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch(() => {
      console.log("MongoDB connection failed");
    });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

main();
