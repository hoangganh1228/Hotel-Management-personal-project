const homeRoute = require("./home.route");
const roomRoute = require("./room.route")

module.exports = (app) => {
  app.use("/", homeRoute);

  app.use("/rooms", roomRoute);

}