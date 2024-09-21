const express = require("express");
const multer  = require('multer');
const router = express.Router();

const upload = multer();
const controller = require("../../controllers/admin/room-facility.controller");

const validate = require("../../validates/admin/room-facility.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single('icon'),
  uploadCloud.upload,
  validate.creatPost,   
  controller.createPost,
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single('icon'),
  uploadCloud.upload,
  validate.creatPost,   
  controller.editPatch,
);

router.delete("/delete/:id", controller.delete)

router.get("/detail/:id", controller.detail);


module.exports = router