const cron = require('node-cron');
const BookingOrder = require('../models/booking_order.model');

cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiredBookings = await BookingOrder.updateMany(
      { check_out: { $lte: today } },
      { $set: { check_in: null, check_out: null } }
    );

    // console.log(`Đã reset ${expiredBookings.nModified} bản ghi trong bảng BookingOrder.`);
  } catch (error) {
    console.error("Có lỗi xảy ra khi chạy cron job:", error);
  }
});
