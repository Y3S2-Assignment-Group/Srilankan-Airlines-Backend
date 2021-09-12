const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  Class: {
    type: String,
  },
  seatNo: {
    type: String,
  },
  Flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  CheckinStatus: {
    type: Boolean,
  },
  BookingStatus: {
    type: Boolean,
  },
});

module.exports = Trip = mongoose.model("Trip", TripSchema);
