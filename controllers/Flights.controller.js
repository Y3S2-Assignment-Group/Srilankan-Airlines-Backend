const Flight = require("../models/Trip.model");
const Plane = require("../models/Plane.model");

//Insert plane to the system
const addFlight = async (req, res) => {
  const { to, from, departure, arrival, gate, plane } = req.body;

  try {
    //create a user instance
    const flight = new Flight({
      to,
      from,
      departure,
      arrival,
      gate,
      seats: [],
      status: "Scheduled",
      plane,
    });

    //save user to the database
    await flight
      .save()
      .then(async (insertedFlight) => {
        const plane = await Plane.findById(insertedFlight.plane._id);
        plane.flight.unshift(insertedFlight);
        await plane.save();

        res.json(insertedFlight);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

//updating flight status
const updateFlightStatus = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (flight != null) {
      Flight.findByIdAndUpdate(req.params.id).then(async (existingFlight) => {
        existingFlight.status = req.body.status;

        existingFlight
          .save()
          .then((response) => res.json(response))
          .catch((err) => res.status(400).json("Error: " + err));
      });
    }
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Booking seats


module.exports = {
  addFlight,
  updateFlightStatus,
};
