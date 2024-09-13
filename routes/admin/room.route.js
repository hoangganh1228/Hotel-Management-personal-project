const express = require("express");
const multer  = require('multer')
const router = express.Router();

const controller = require("../../controllers/admin/room.controller");

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single('thumbnail'),
  uploadCloud.upload,
  controller.createPost
);

module.exports = router