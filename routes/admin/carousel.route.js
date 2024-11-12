const express = require("express");
const multer  = require('multer')

const router = express.Router();

const controller = require("../../controllers/admin/carousel.controller");

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);

router.post(
  "/upload", 
  upload.array('images', 10),
  uploadCloud.uploadMultiple,
  controller.uploadPost
)

router.delete('/delete', controller.delete);

module.exports = router;