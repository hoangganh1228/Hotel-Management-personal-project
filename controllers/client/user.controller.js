const md5 = require("md5");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const BookingOrder = require("../../models/booking_order.model")
const ReviewRating = require("../../models/review-rating.model")

const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email
  })

  if(existEmail) {
    req.flash("error", "Email đã tồn tại!");
    res.redirect("back");
    return;
  }

  if(req.body.password != req.body.password_confirm) {
    req.flash("error", "Mật khẩu không khớp");
    res.redirect("back");
    return;
  }

  req.body.password = md5(req.body.password);

  const user = new User(req.body);
  await user.save(); 
  
  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};

// [GET] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản",
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false
  })
  
  if(!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  if(md5(password) !=  user.password) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }

  if(user.status === "inactive") {
    req.flash("error", "Tài khoản đang bị khóa!");
    res.redirect("back");
    return;
  }

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
}

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Lấy lại mật khẩu",
  });
}

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false
  })

  if(!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  const otp = generateHelper.generateRandomNumber(6);

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now()
  };

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
    Mã OTP để lấy lại mật khẩu là <b style="color: green;">${otp}</b>. Thời hạn sử dụng là 3 phút.
  `;
  
  sendMailHelper.sendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);

}

module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
}

module.exports.otpPasswordPoat = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp
  })

  if(!result) {
    req.flash("error", "OTP không hợp lệ!");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email
  });

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/user/password/reset");
}

module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Đổi mật khẩu",
  });
};

module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;

  const tokenUser = req.cookies.tokenUser;

  await User.findOne({
    tokenUser: tokenUser
  }, {
    password: md5(password)
  })

  res.redirect("/");
};

// [GET] /user/booking
module.exports.booking = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;

  const user = await User.findOne({
    tokenUser: tokenUser
  })

  if(!user) {
    return res.redirect("/user/login")
  }

  const bookings = await BookingOrder.find({user_id: user.id})
    .populate({
      path: 'room_id',
      select: '_id name'
    })
    .populate({
      path: 'user_id',
      select: '_id fullName'
    })
    

  res.render("client/pages/user/booking", {
    pageTitle: "Phòng bạn đã dặt",
    bookings: bookings
  })
}

// [GET] /user/submit-review
module.exports.submitReview = async (req, res) => {
  try {
    const { rating, review, booking_id, room_id, user_id } = req.body;
    
    const objectRating = new ReviewRating({
      user_id: user_id,
      booking_id: booking_id,
      room_id: room_id,
      rating: rating,
      review: review
    })
  
    await objectRating.save();
  
    req.flash("success", "Đánh giá và nhận xét thành công!")
    res.redirect('back');
  } catch (error) {
    req.flash("error", "Đánh giá và nhận xét thất bại!")
  }
}

// [GET] /user/profile
module.exports.profile = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;

  const user = await User.findOne({
    tokenUser: tokenUser
  })


  res.render("client/pages/user/profile", {
    pageTitle: "Hồ sơ người dùng",
    user: user 
  })
}

// [GET] /user/profile
module.exports.profilePatch = async (req, res) => {
  try {
    const objectProfile = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      address: req.body.address
    };
    await User.updateOne({ tokenUser: req.body.tokenUser }, objectProfile);
    req.flash("success", "Lưu thông tin cá nhân thành công");
  } catch (error) {
    req.flash("error", "Lưu thông tin cá nhân thất bại");
  }

  res.redirect("back");
}