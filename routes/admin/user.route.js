const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/user.controller");

router.get("/", controller.index);

router.delete("/delete/:id", controller.delete);

module.exports = router