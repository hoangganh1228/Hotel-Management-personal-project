const express = require("express");
const multer  = require('multer');
const router = express.Router();

const upload = multer();
const controller = require("../../controllers/admin/room-facility.controller");

// const validate = require("../../validates/admin/room-category.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);

module.exports = router