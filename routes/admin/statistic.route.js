const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/statistic.controller");

router.get("/", controller.index);

// router.get("/overview", controller.revenueOverview);

module.exports = router