const Plane = require("../models/Plane.model");

//Insert plane to the system
const addPlane = async (req, res) => {
  const { planeNo, planeImg } = req.body;

  try {
    //create a user instance
    const plane = new Plane({
      planeNo,
      planeImg,
      flight: [],
    });

    //save user to the database
    await plane.save()
      .then(async (insertedPlane) => {
        res.json(insertedPlane);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  addPlane,
};
