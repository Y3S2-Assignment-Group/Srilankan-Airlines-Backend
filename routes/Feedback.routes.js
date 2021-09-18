const express = require("express");
const router = express.Router();

const {
    addFeedback,
} = require("../controllers/Feedback.controller");

//@route  POST api/feedback
//@desc   Add feedback
//@access Public
router.post("/", addFeedback);

module.exports = router;