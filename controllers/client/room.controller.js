const Room = require("../../models/room.model")
const RoomFacility = require("../../models/room-facility.model")
const RoomFeatures = require("../../models/room-features.model")
const RoomCategory = require("../../models/room-category.model");
// [GET] products/index
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
    status: 'active'
  }

  const sort = {
    position: -1
  }

  const rooms = await Room.find(find).sort(sort);
  const facilities = await RoomFacility.find(find);
  const features = await RoomFeatures.find();

  
  for(const room of rooms) {
    room.facilities = [];
    room.features = [];
    
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
  res.render("client/pages/rooms/index", {
    pageTitle: "Trang phòng",
    rooms: rooms,
    facilities: facilities
  })
}