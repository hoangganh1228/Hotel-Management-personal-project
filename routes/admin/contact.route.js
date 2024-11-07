const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/contact.controller");

router.get("/", controller.index);

router.get("/response/:id", controller.response);

router.post("/response/:id", controller.responsePost);

router.delete("/delete/:id", controller.delete);

module.exports = router;