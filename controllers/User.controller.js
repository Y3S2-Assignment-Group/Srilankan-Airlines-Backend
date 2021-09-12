const User = require("../models/User.model");

//get User details
const getUserDetails = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await Employee.findById(req.body.id)
      .select("-password")
      .populate({ path: "prevTrips", model: "Trip" })
      .populate({ path: "CurrentTrip", model: "Trip" })
      .populate({ path: "scheduledTrips", model: "Trip" });
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getUserDetails,
};
