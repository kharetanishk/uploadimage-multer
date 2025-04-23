const express = require("express");
const app = express();
const port = 6262;
const mongoose = require("mongoose");
const { uploadRouter } = require("./Routers/upload");
require("dotenv").config();
const mongourl = process.env.MONGO_URL;

app.use(express.static("public"));
app.use("/upload", uploadRouter);

async function main() {
  await mongoose
    .connect(mongourl)
    .then(() => {
      console.log(`THE MONGOOSE DATABASE IS CONNECTED SUCCESSFULLY`);
    })
    .catch(() => {
      console.log(`ERROR WHILE CONNECTING THE MONGOOSE DATABASE`);
    });

  console.log("waiting for the app to connect ");

  app.listen(port, () => {
    console.log(`the app is listening to the port ${port}`);
  });
}

main();
