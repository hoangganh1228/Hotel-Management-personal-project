const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/setting.controller");

router.get("/general", controller.index);

router.patch("/general", controller.generalPatch);

module.exports = router;
