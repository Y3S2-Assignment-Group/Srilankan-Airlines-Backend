const Flight = require("../models/Flight.model");
const Plane = require("../models/Plane.model");

//get flight by Id
const getFlightById = async (req, res) => {
  try {
    const flights = await Flight.findById(req.params.id)
      .populate({ path: "seats", model: "Seat" })
      .populate({
        path: "plane",
      });
    res.json(flights);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//get all flights
const getFlightList = async (req, res) => {
  try {
    const flights = await Flight.find().populate({
      path: "plane",
    });
    res.json(flights);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Insert plane to the system
const addFlight = async (req, res) => {
  const { to, from, departure, arrival, gate, plane } = req.body;

  const seats = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];


  try {
    //create a user instance
    const flight = new Flight({
      to,
      from,
      departure,
      arrival,
      gate,
      seats,
      status: "Scheduled",
      plane,
    });

    //save user to the database
    await flight
      .save()
      .then(async (insertedFlight) => {
        const updatePlane = await Plane.findById(plane);
        updatePlane.flight.unshift(insertedFlight);
        await updatePlane.save();

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
const updateFlightBookingSeats = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (flight != null) {
      Flight.findByIdAndUpdate(req.params.id).then(async (existingFlight) => {
        existingFlight.seats = req.body.seats;

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

module.exports = {
  addFlight,
  updateFlightStatus,
  getFlightList,
  getFlightById,
  updateFlightBookingSeats
};
