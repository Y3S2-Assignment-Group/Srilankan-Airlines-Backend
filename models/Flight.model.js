const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  To: {
    type: String,
  },
  From: {
    type: String,
  },
  Departure: {
    type: Date,
  },
  Arrival: {
    type: Date,
  },
  Gate: {
    type: String,
  },
  Seats: [
    [
      {
        type: Boolean,
      },
    ],
  ],
  Status: {
    type: String,
  },
  Plane: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plane",
  },
});

module.exports = Flight = mongoose.model("Flight", FlightSchema);
