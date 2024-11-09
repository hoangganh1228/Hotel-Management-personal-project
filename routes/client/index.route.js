const homeRoute = require("./home.route");
const roomRoute = require("./room.route")
const facilityRoute = require("./facilities.route")
const userRoutes = require("./user.route");
const contactRoute = require("./contact.route")
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");

module.exports = (app) => {
  app.use(userMiddleware.infoUser);
  app.use(settingMiddleware.SettingGeneral);

  app.use("/", homeRoute);

  app.use("/rooms", roomRoute);

  app.use("/facilities", facilityRoute);

  app.use("/user", userRoutes);
 
  app.use("/contact", contactRoute);



}