const systemConfig = require("../../config/system");

const dashboardRoute = require("./dashboard.route");

const roomRoute = require("./room.route");

const roomCategoryRoute = require("./room-category.route");

const roomFacilityRoute = require("./room-facility.route");

const roleRoutes = require("./role.route");

const accountRoutes = require("./account.route");

const authRoutes = require("./auth.route");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth, 
    dashboardRoute
  );
  
  app.use(
    PATH_ADMIN + "/rooms", 
    authMiddleware.requireAuth, 
    roomRoute
  );
  
  app.use(
    PATH_ADMIN + "/rooms-category", 
    authMiddleware.requireAuth, 
    roomCategoryRoute
  );

  app.use(
    PATH_ADMIN + "/rooms-facility", 
    authMiddleware.requireAuth, 
    roomFacilityRoute
  );

  app.use(
    PATH_ADMIN + "/roles", 
    authMiddleware.requireAuth, 
    roleRoutes
  );

  app.use(
    PATH_ADMIN + "/accounts", 
    authMiddleware.requireAuth, 
    accountRoutes
  );

  app.use(
    PATH_ADMIN + "/auth", 
    authMiddleware.requireAuth, 
    authRoutes
  );

}