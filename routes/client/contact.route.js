const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/contact.controller");

router.get("/", controller.index);

router.post("/", controller.contactPost);


module.exports = router;