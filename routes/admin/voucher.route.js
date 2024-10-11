const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/voucher.controller");

const validate = require("../../validates/admin/voucher.validate");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create", 
  validate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id", 
  validate.editPatch,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);



module.exports = router