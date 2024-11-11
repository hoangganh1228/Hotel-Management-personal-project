const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/bookings.controller");

router.get("/", controller.index);

router.delete("/delete/:id", controller.delete)

module.exports = router