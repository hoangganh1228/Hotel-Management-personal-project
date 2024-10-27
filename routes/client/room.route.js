const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/room.controller");

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.get("/book_now/:id", controller.bookNow);

router.post('/calculate-price', controller.calculatePrice);

router.post("/payment", controller.payment);

router.get("/confirm_booking", controller.confirmBooking);

router.get("/pay_status/:order_id", controller.payStatus);


module.exports = router