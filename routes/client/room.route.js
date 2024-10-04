const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/room.controller");

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

// router.get("/filter", controller.filter);



module.exports = router