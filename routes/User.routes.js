const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    getUserDetails,
    bookTrip,
    checkinTrip,
    scheduleTrips,
} = require("../controllers/User.controller");

router.get("/details", getUserDetails);

router.post("/bookTrip", bookTrip);

router.put("/checkIn/:id", checkinTrip);

router.post("/scheduleTrip", scheduleTrips);



module.exports = router;


