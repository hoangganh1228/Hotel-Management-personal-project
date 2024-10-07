const homeRoute = require("./home.route");
const roomRoute = require("./room.route")
const facilityRoute = require("./facilities.route")
const userRoutes = require("./user.route");

module.exports = (app) => {
  app.use("/", homeRoute);

  app.use("/rooms", roomRoute);

  app.use("/facilities", facilityRoute);

  app.use("/user", userRoutes);

}