const express = require("express");
const router = express.Router();

const {
    addPlane,
} = require("../controllers/Plane.controller");

//@route  POST api/feedback
//@desc   Add feedback
//@access Public
router.post("/plane", addPlane);

module.exports = router;