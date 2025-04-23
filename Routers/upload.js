const express = require("express");
const { Router } = require("express");
const uploadRouter = Router();
const { UploadModel } = require("../db");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" }); //UPLOADS IS A FOLDER HERE

uploadRouter.use(express.urlencoded({ extended: true }));
uploadRouter.post(
  "/image",
  upload.single("profile-picture"), //UOLOAD.SINGLE LETS YOU UPLOAD SINGLE FILES
  async function (req, res) {
    const { title } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!imagePath) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      await UploadModel.create({
        title: title,
        imagePath: imagePath,
      });

      res.status(200).json({
        message: "the database is created go check mf",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = {
  uploadRouter: uploadRouter,
};

//I KNOW USING MULTER THIS ROUTER IS  A MIDDLEWARE NOT A ROUTER, BUT STILL
//I AM DOING IT EXPLICITLY COZ I KNOW WHAT I AM DOING
