const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    getUserDetails,
    bookTrip,
    checkinTrip,
    scheduleTrips,
} = require("../controllers/User.controller");

const {
    loginUserWithGoogle, registerUser
} = require("../controllers/AuthController.controller");

router.get("/login", loginUserWithGoogle);

router.get("/register", registerUser);

router.get("/details/:id", getUserDetails);

router.post("/bookTrip", bookTrip);

router.put("/checkIn/:id", checkinTrip);

router.post("/scheduleTrip", scheduleTrips);

module.exports = router;


