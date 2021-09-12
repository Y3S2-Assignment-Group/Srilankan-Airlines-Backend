const User = require("../models/User.model");
const Flight = require("../models/Flight.model");
const Trip = require("../models/Trip.model");

//get User details
const getUserDetails = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await User.findById(req.body.id)
      .select("-password")
      .populate({ path: "prevTrips", model: "Trip" })
      .populate({ path: "currentTrip", model: "Trip" })
      .populate({ path: "scheduledTrips", model: "Trip" });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//book flights
const bookTrip = async (req, res) => {
  const { flightClass, seatNo, flight } = req.body;

  try {
    //create a user instance
    const trip = new Trip({
      flightClass,
      seatNo,
      flight,
      checkinStatus: false,
      bookingStatus: true,
    });

    //save user to the database
    await trip
      .save()
      .then(async (insertedTrip) => {
        //todo: add to users current trip
        res.json(insertedTrip);

      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//checkin to flight
const checkinTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip != null) {
      trip.findByIdAndUpdate(req.params.id).then(async (existingTrip) => {
        existingTrip.checkinStatus = true;

        existingTrip
          .save()
          .then((response) => {
            //todo:remove from users current and add to prev
            res.json(response);
          })
          .catch((err) => res.status(400).json("Error: " + err));
      });
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//schedule trips
const scheduleTrips = async (req, res) => {
  const { flightClass, seatNo, flight } = req.body;

  try {
    //create a user instance
    const trip = new Trip({
      flightClass,
      seatNo,
      flight,
      checkinStatus: false,
      bookingStatus: false,
    });

    //save user to the database
    await trip
      .save()
      .then(async (insertedSchedule) => {
        //todo: add to users scheduled trip

        res.json(insertedSchedule);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};
module.exports = {
  getUserDetails,
  bookTrip,
  checkinTrip,
  scheduleTrips
};
