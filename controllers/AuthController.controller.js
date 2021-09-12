const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const config = require("config");
const { OAuth2Client } = require("google-auth-library");


//Login User With Google
const loginUserWithGoogle = async (req, res) => {
    const { tokenId } = req.body;

    const client = new OAuth2Client(
      "832304410996-o3j7n3jf6jjj83ajhgsigj4p64ri3ifq.apps.googleusercontent.com"
    );
  
    client
      .verifyIdToken({
        idToken: tokenId,
        audience:
          "832304410996-o3j7n3jf6jjj83ajhgsigj4p64ri3ifq.apps.googleusercontent.com",
      })
      .then((response) => {
        const { email_verified, name, email, picture } = response.payload;
  
        console.log(response.payload);
  
        if (email_verified) {
          User.findOne({ email }).exec((err, user) => {
            if (err) {
              return res.status(400).json({
                error: "Something went wrong",
              });
            } else {
              if (user) {
                const payload = {
                  user: {
                    email: user.email,
                  },
                };
  
                jwt.sign(
                  payload,
                  config.get("jwtSecret"),
                  { expiresIn: 360000 },
                  (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                  }
                );
              } else {

                //if there is no user already
                let newUser = new User({ name, email, picture });

                res.json(newUser);
  
              }
            }
          });
        }
      });
};

//Login User With Google
const loginUserWithGoogle = async (req, res) => {
    const { tokenId } = req.body;

    const client = new OAuth2Client(
      "832304410996-o3j7n3jf6jjj83ajhgsigj4p64ri3ifq.apps.googleusercontent.com"
    );
  
    client
      .verifyIdToken({
        idToken: tokenId,
        audience:
          "832304410996-o3j7n3jf6jjj83ajhgsigj4p64ri3ifq.apps.googleusercontent.com",
      })
      .then((response) => {
        const { email_verified, name, email, picture } = response.payload;
  
        console.log(response.payload);
  
        if (email_verified) {
          User.findOne({ email }).exec((err, user) => {
            if (err) {
              return res.status(400).json({
                error: "Something went wrong",
              });
            } else {
              if (user) {
                const payload = {
                  user: {
                    email: user.email,
                  },
                };
  
                jwt.sign(
                  payload,
                  config.get("jwtSecret"),
                  { expiresIn: 360000 },
                  (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                  }
                );
              } else {

                //if there is no user already
                let newUser = new User({ name, email, picture });

                res.json(newUser);
  
              }
            }
          });
        }
      });
};

module.exports = { getUserDetails, loginUserWithGoogle };
