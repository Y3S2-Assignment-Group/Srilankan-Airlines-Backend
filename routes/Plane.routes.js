const express = require("express");
const router = express.Router();

const {
    addPlane,getPlaneList
} = require("../controllers/Plane.controller");

//@route  GET api/feedback
//@desc   Get plane list
//@access Public
router.get("/getlist", getPlaneList);

//@route  POST api/plane/add
//@desc   Add plane
//@access Public
router.post("/add", addPlane);

module.exports = router;