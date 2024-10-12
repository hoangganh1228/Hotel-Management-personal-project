const Room = require("../../models/room.model")
const RoomFacility = require("../../models/room-facility.model")
const RoomFeatures = require("../../models/room-features.model")
const RoomCategory = require("../../models/room-category.model");
const User = require("../../models/user.model");

const { featureFacilityHelper } = require("../../helpers/featureFacility")

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