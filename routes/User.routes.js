const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    getUserDetailsByUserId,
    getUserDetails,
    bookTrip,
    checkinTrip,
    scheduleTrips,
} = require("../controllers/User.controller");

const {
    loginUser,loginUserWithGoogle, registerUser
} = require("../controllers/AuthController.controller");

router.post("/login", loginUser);

router.post("/loginwithgoogle", loginUserWithGoogle);

router.post("/register", registerUser);

router.get("/",auth, getUserDetails);

router.get("/details/:id", getUserDetailsByUserId);

router.post("/bookTrip",auth, bookTrip);

router.put("/checkIn/:id",auth, checkinTrip);

router.post("/scheduleTrip",auth, scheduleTrips);

module.exports = router;


