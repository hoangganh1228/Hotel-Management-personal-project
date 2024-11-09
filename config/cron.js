const cron = require('node-cron');
const BookingOrder = require('../models/booking_order.model');

cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookedRooms = await BookingOrder.updateMany(
      { check_in: { $lte: today }, check_out: { $gte: today } },
      { $set: { room_status: 'booked' } }
    );

    const emptyRooms = await BookingOrder.updateMany(
      { $or: [{ check_in: { $gt: today } }, { check_out: { $lt: today } }] },
      { $set: { room_status: 'empty' } }

  )

  console.log(`Đã cập nhật ${bookedRooms.nModified} phòng thành "booked" và ${emptyRooms.nModified} phòng thành "empty".`);
  } catch (error) {
    console.error("Có lỗi xảy ra khi chạy cron job:", error);
  }
});
