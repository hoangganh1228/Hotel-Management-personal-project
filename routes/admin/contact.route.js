const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/contact.controller");

router.get("/", controller.index);


module.exports = router;