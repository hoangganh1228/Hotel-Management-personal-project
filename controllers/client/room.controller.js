const Room = require("../../models/room.model")
const RoomFacility = require("../../models/room-facility.model")
const RoomFeatures = require("../../models/room-features.model")
const RoomCategory = require("../../models/room-category.model");
const User = require("../../models/user.model");
const Voucher = require("../../models/voucher.model");
const BookingOrder = require("../../models/booking_order.model");

const { featureFacilityHelper } = require("../../helpers/featureFacility");
const { default: axios } = require("axios");


// [GET] rooms/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
    status: 'active'
  }

  const adult = parseInt(req.query.adult);
  const children = parseInt(req.query.children);

  

  if(adult || children) {
    find.$or = [];
    if(adult) {
      find.$or.push({ adult: { $gte: adult } })
    }
    
    if(children) {
      find.$or.push({ children: { $gte: children } })
    }

    if (find.$or.length === 0) {
      delete find.$or;
    }
  }

  const selectedFacilities = req.query.facility || []; 
  const selectedFeatures = req.query.feature || [];    

  // Đảm bảo selectedFacilities và selectedFeatures luôn là mảng
  const facilitiesArray = Array.isArray(selectedFacilities) ? selectedFacilities : [selectedFacilities];
  const featuresArray = Array.isArray(selectedFeatures) ? selectedFeatures : [selectedFeatures];

  if(facilitiesArray.length > 0) {
    find.room_facilities_id = { $in: facilitiesArray }
  }

  if(featuresArray.length > 0) {
    find.room_features_id = { $in: featuresArray }
  }


  const sort = {
    position: -1
  }

  const rooms = await Room.find(find).sort(sort);
  const facilities = await RoomFacility.find();
  const features = await RoomFeatures.find();
  
  for(const room of rooms) {
    await featureFacilityHelper(room)
  }

  res.render("client/pages/rooms/index", {
    pageTitle: "Trang phòng",
    rooms: rooms,
    facilities: facilities,
    features: features,
    facilitiesArray: facilitiesArray,
    featuresArray: featuresArray
  })
    
}

// [GET] rooms/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  
  const room = await Room.findOne({
    _id: id
  }).select("name room_category_id description price discountPercentage adult children thumbnail stock images room_facilities_id room_features_id");
  
  // console.log(room)

  await featureFacilityHelper(room)

  const images = [];
  res.render("client/pages/rooms/detail", {
    pageTitle: "Chi tiết phòng",
    room: room
  })
  
}

// [GET] rooms/book_now/:id
module.exports.bookNow = async (req, res) => {
  const id = req.params.id;
  const tokenUser = req.cookies.tokenUser;


  const room = await Room.findOne({
    _id: id
  })

  const user = await User.findOne({
    tokenUser: tokenUser
  })

  res.render("client/pages/rooms/book_now", {
    pageTitle: "Xác nhận đặt phòng",
    room: room,
    user: user
  })
}

// [POST] rooms/
module.exports.calculatePrice = async (req, res) => {
  // console.log(req.body);
  const {id, days, voucherCode} = req.body;
  // console.log(id);
  
  try {
    const room = await Room.findOne({
      _id: id
    }).select("price");

    let totalPrice = days * room.price;
    
    // console.log(voucherCode);
    

    if(voucherCode) {
      const voucher = await Voucher.findOne({
        code: voucherCode,
        status: "active",
        deleted: false
      })

      if(!voucher) {
        res.json({
          code: 400,
          message: 'Mã voucher không hợp lệ hoặc đã hết lượt sử dụng'
        })
        return
      } 

      if(new Date(voucher.expirationDate) < new Date()) {
        res.json({
          code: 400,
          message: 'Mã voucher đã hết lượt sử dụng'
        })
        return
      }

      if(voucher.usageLimit > 0) {
        await Voucher.updateOne({
          code: voucherCode
        }, {
          $inc: { usageLimit: -1 }
        })
      } else {
        res.json({
          code: 200,
          message: 'Mã voucher đã hết lượt sử dụng'
        })
        return
      }

      totalPrice -= (totalPrice * (voucher.discountValue / 100));
    }

    res.json({
      code: 200,
      totalPrice
    })

  } catch (error) {
    console.error('Lỗi khi tính tổng số tiền:', error);
    res.json({
      code: 500,
      message: 'Lỗi server'
    })
    return 
  }
  
}

// [POST] rooms/payment
module.exports.payment = async (req, res) => {
  const user_id = req.body.user_id || null;
  const {room_id, checkin, checkout, total_price, email, phone } = req.body;
  
  // console.log(req.body);
  
  var accessKey = 'F8BBA842ECF85';
  var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  var orderInfo = 'pay with MoMo';
  var partnerCode = 'MOMO';
  var redirectUrl = 'http://localhost:3000/rooms/confirm_booking';
  var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  var requestType = "payWithMethod";
  var amount = total_price;
  var orderId = "ORD" + new Date().getTime();
  var requestId = orderId;
  var extraData ='';
  var orderGroupId ='';
  var autoCapture =true;
  var lang = 'vi';

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
  //puts raw signature
  // console.log("--------------------RAW SIGNATURE----------------")
  // console.log(rawSignature)
  //signature
  const crypto = require('crypto');
  var signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');
  // console.log("--------------------SIGNATURE----------------")
  // console.log(signature)

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
      partnerCode : partnerCode,
      partnerName : "Test",
      storeId : "MomoTestStore",
      requestId : requestId,
      amount : amount,
      orderId : orderId,
      orderInfo : orderInfo,
      redirectUrl : redirectUrl,
      ipnUrl : ipnUrl,
      lang : lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData : extraData,
      orderGroupId: orderGroupId,
      signature : signature
  });

  //options for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    },
    data: requestBody
  }
  
  let result;
  try {
    result = await axios(options);
    if(result.data && result.data.resultCode === 0) {
      const objectBookingOrder = {
        user_id,
        room_id,
        check_in: checkin,
        check_out: checkout,
        trans_status: 'Pending',
        order_id: orderId,
        email: email,
        phone: phone
      }

      const bookingOrder = new BookingOrder(objectBookingOrder);
      bookingOrder.save();
      

      return res.redirect(result.data.payUrl);
    } else {
      req.flash("error", `Có lỗi xảy ra trong quá trình thanh toán`)
      return res.redirect("back");
    }

  } catch (error) {
    req.flash("error", `Có lỗi xảy ra trong quá trình thanh toán`)
    return res.redirect("back");
  }

}

// [POST] rooms/confirm_booking
module.exports.confirmBooking = async (req, res) => {
  const { orderId, amount, resultCode, message } = req.query;
  if(parseInt(resultCode) === 0 && message == 'Successful.') {
    await BookingOrder.updateOne({
      order_id: orderId
    }, {
      booking_status: 'booked',
      trans_status: 'Successful',
      trans_amt: amount,
    })  

  } else {
    await BookingOrder.updateOne({
      order_id: orderId
    }, {
      booking_status: 'payment_failed',
      trans_status: 'Failed'
    });
  }

  res.redirect(`/rooms/pay_status/${orderId}`);

}

module.exports.payStatus = async (req, res) => {
  const order_id = req.params.order_id;

  const order = await BookingOrder.findOne({
    order_id: order_id
  });

  res.render("client/pages/rooms/pay_status", {
    pageTitle: "Trạng thái thanh toán",
    order: order
  })
}