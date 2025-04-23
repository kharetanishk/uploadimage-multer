const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Upload = new Schema({
  title: String,
  imagePath: String,
});

const UploadModel = mongoose.model("images", Upload);

module.exports = {
  UploadModel: UploadModel,
};
