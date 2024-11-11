const systemConfig = require("../../config/system");

const dashboardRoute = require("./dashboard.route");

const roomRoute = require("./room.route");

const roomCategoryRoute = require("./room-category.route");

const roomFacilityRoute = require("./room-facility.route");

const roomFeaturesRoute = require("./room-features.route");

const roleRoutes = require("./role.route");

const accountRoutes = require("./account.route");

const authRoutes = require("./auth.route");

const myAccountRoutes  = require("./my-account.route");

const userRoute  = require("./user.route");

const voucherRoute  = require("./voucher.route");

const statisticRoute  = require("./statistic.route");

const contactRoute = require("./contact.route");

const bookingRoute = require("./booking.route");

const settingRoute = require("../../routes/admin/setting.route");

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
    PATH_ADMIN + "/rooms-features", 
    authMiddleware.requireAuth, 
    roomFeaturesRoute
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
    PATH_ADMIN + "/my-account", 
    authMiddleware.requireAuth, 
    myAccountRoutes
  );

  app.use(
    PATH_ADMIN + "/auth", 
    authRoutes
  );

  app.use(
    PATH_ADMIN + "/users", 
    authMiddleware.requireAuth, 
    userRoute
  );

  app.use(
    PATH_ADMIN + "/vouchers", 
    authMiddleware.requireAuth, 
    voucherRoute
  );

  app.use(
    PATH_ADMIN + "/contact", 
    authMiddleware.requireAuth, 
    contactRoute
  );

  app.use(
    PATH_ADMIN + "/bookings", 
    authMiddleware.requireAuth, 
    bookingRoute
  );

  app.use(
    PATH_ADMIN + "/statistics", 
    authMiddleware.requireAuth, 
    statisticRoute
  );

  app.use(
    PATH_ADMIN + "/settings", 
    authMiddleware.requireAuth, 
    settingRoute
  )
}