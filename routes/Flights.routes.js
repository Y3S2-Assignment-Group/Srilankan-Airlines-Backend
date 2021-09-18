const express = require("express");
const router = express.Router();

const {
    addFlight,
    updateFlightStatus,
    getFlightList,
} = require("../controllers/Flights.controller");

//@route  POST api/addFlight
//@desc   Add Flights
//@access Public
router.post("/", addFlight);

//@route  PUT api/updateFlightStatus
//@desc   update Flight Status
//@access Public
router.put("/", updateFlightStatus);

//@route  GET api/getFlightList
//@desc   Get Flight List
//@access Public
router.get("/", getFlightList);

module.exports = router;

