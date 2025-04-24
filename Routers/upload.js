const express = require("express");
const { Router } = require("express");
const uploadRouter = Router();
const { UploadModel } = require("../db");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now();
    cb(null, `${suffix}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
uploadRouter.use(express.urlencoded({ extended: false }));

uploadRouter.post(
  "/image",
  upload.single("profile-picture"),
  async function (req, res) {
    const { title } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      await UploadModel.create({
        title: title,
        imagePath: imagePath,
      });

      res.status(200).json({
        message: "Image uploaded and saved to DB",
        imageUrl: `/uploads/${req.file.filename}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = {
  uploadRouter,
};
