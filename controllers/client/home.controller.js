const Room = require("../../models/room.model");
const RoomCategory = require("../../models/room-category.model");
const RoomFacility = require("../../models/room-facility.model")
const RoomFeatures = require("../../models/room-features.model")

const Account = require("../../models/account.model");


// [GET] /
module.exports.index = async (req, res) => {
  
  const find = {
    deleted: false,
    status: 'active'
  }

  const rooms = await Room.find(find).limit(3).sort({ position: -1 });
  
  const facilities = await RoomFacility.find(find).limit(6);

  const features = await RoomFeatures.find();

  for(const room of rooms) {
    room.facilities = [];
    room.features = [];
    // console.log(room.room_facilities_id);
    
    for(let i = 0; i < room.room_facilities_id.length; i++) {
      const id = room.room_facilities_id[i];
      // console.log(id);
      
      const facility = await RoomFacility.findOne({
        _id: id
      }).select("title")
      
      room.facilities.push(facility);
      
    }

    for(let i = 0; i < room.room_features_id.length; i++) {
      const id = room.room_features_id[i];
      
      const feature = await RoomFeatures.findOne({
        _id: id
      }).select("title")
      
      room.features.push(feature);
      
    }
  }

  

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    rooms: rooms,
    facilities: facilities
  })
}