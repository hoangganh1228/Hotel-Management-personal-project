const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller");

const validate = require("../../validates/client/user.validate");

router.get("/register", controller.register);

router.post("/register", validate.registerPost, controller.registerPost);

router.get("/login", controller.login);

router.post("/login", validate.loginPost, controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post(
  "/password/forgot", 
  validate.forgotPasswordPost,
  controller.forgotPasswordPost
);

router.get("/password/otp", controller.otpPassword);

router.post(
  "/password/otp", 
  controller.otpPasswordPoat
);

router.get("/password/reset", controller.resetPassword );

router.post(
  "/password/reset", 
  validate.resetPasswordPost,
  controller.resetPasswordPost
);

router.get("/bookings", controller.booking);

router.post("/submit-review", controller.submitReview); 

router.get("/profile", controller.profile);

router.patch("/profile", controller.profilePatch);



module.exports = router;