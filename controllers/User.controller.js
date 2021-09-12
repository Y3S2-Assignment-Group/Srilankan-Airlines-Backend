const User = require("../models/User.model");
const Flight = require("../models/Flight.model");
const Trip = require("../models/Trip.model");
const Seat = require("../models/Seat.model");

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
  const { email, flightClass, seatNo, flight } = req.body;

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
        const user = User.findOneAndUpdate({ email: email }).then(
          (existingUser) => {
            existingUser.currentTrip = insertedTrip;
          }
        );
        //09A
        //todo:mark seat in trip
        let xVal = 0;
        switch (seatNo.substring(2, 3)) {
          case "A":
            xVal = 0;
            break;
          case "B":
            xVal = 1;
            break;
          case "C":
            xVal = 2;
            break;
          case "D":
            xVal = 3;
            break;
          case "E":
            xVal = 4;
            break;
          case "F":
            xVal = 5;
            break;
          case "G":
            xVal = 6;
            break;
          case "H":
            xVal = 7;
            break;
          case "I":
            xVal = 8;
            break;
        }
        const seat = new Seat({
          xAxis: xVal,
          yAxis: Number(seatNo.substring(0, 2)),
          flight: insertedTrip.flight,
        });
        insertedTrip.flight.seats.un;

        user
          .save()
          .then(() => {
            res.json(insertedTrip);
          })
          .catch((err) => {
            res.json(err);
          });
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
    const { email } = req.body;

    if (trip != null) {
      trip.findByIdAndUpdate(req.params.id).then(async (existingTrip) => {
        existingTrip.checkinStatus = true;

        existingTrip
          .save()
          .then((response) => {
            //todo:remove from users current and add to prev
            let user = User.findOneAndUpdate({ email: email }).then(
              (existingUser) => {
                existingUser.currentTrip = null;
                existingUser.prevTrips.unshift(trip);
              }
            );
            await user.save();
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
  scheduleTrips,
};
