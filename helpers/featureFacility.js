const RoomFacility = require("../models/room-facility.model");
const RoomFeatures = require("../models/room-features.model");


async function featureFacilityHelper(room) {
  room.facilities = [];
  room.features = [];

  // Fetch facilities
  for (let i = 0; i < room.room_facilities_id.length; i++) {
    const id = room.room_facilities_id[i];
    const facility = await RoomFacility.findOne({
      _id: id
    }).select("title");
    
    if (facility) {
      room.facilities.push(facility);
    }
  }

  // Fetch features
  for (let i = 0; i < room.room_features_id.length; i++) {
    const id = room.room_features_id[i];
    const feature = await RoomFeatures.findOne({
      _id: id
    }).select("title");

    if (feature) {
      room.features.push(feature);
    }
  }
}

module.exports = {
  featureFacilityHelper
};