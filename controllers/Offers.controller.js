const bcrypt = require("bcryptjs");
const Offer = require("../models/Offers.model");
const jwt = require("jsonwebtoken");
const config = require("config");

//get All Offer details
const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

const viewOffer = async (req, res) => {
  try {
    const offers = await Offer.find("id");
    res.json(offers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getAllOffers,
  viewOffer,
};