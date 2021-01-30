const express = require("express");
const authRoutes = require("../routes/authRoute");
const profileRoutes = require("../routes/profileRoutes");
const passportSetup = require("../config/passportSetup");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const serverless = require("serverless-http");

const app = express();

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["akash"],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/.netlify/functions/", (req, res, _) => {
  res.send("Auth Service");
  console.log("hello");
});
mongoose.connect(
  "mongodb+srv://admin1:J8I1Ul8i2pQb27vm@cluster0.wap0k.mongodb.net/test?retryWrites=true&w=majority",
  () => {
    console.log("connected to mongodb");
  }
);
app.use("/.netlify/functions/auth", authRoutes);
app.use("/.netlify/functions/profile", profileRoutes);
app.listen(8080, () => {
  console.log("Listening to port 8080");
});
module.exports.handler = serverless(app);
