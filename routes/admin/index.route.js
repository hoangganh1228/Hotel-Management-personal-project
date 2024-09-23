const systemConfig = require("../../config/system");

const dashboardRoute = require("./dashboard.route");

const roomRoute = require("./room.route");

const roomCategoryRoute = require("./room-category.route");

const roomFacilityRoute = require("./room-facility.route");

const roleRoutes = require("./role.route");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", dashboardRoute);
  
  app.use(PATH_ADMIN + "/rooms", roomRoute);
  
  app.use(PATH_ADMIN + "/rooms-category", roomCategoryRoute);

  app.use(PATH_ADMIN + "/rooms-facility", roomFacilityRoute);

  app.use(PATH_ADMIN + "/roles", roleRoutes);

}