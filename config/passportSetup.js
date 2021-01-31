const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/User");

const mongoose = require("mongoose");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/.netlify/functions/app/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      //passport call-back function
      console.log("cb fired");
      console.log(profile);

      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log(currentUser);
          done(null, currentUser);
        } else {
          console.log(profile);
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log(newUser);
              done(null, newUser);
              mongoose.disconnect();
            })
            .catch((err) => {
              console.log("not able to create user");
            });
        }
      });
    }
  )
);
