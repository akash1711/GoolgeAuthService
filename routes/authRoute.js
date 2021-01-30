const passport = require("passport");
const router = require("express").Router();

// Auth Login
router.get("/login", (req, res, _) => {
  res.send("login");
});

router.get("/logout", (req, res, _) => {
  req.logout();
  res.redirect("/.netlify/functions/app/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google to redirect to
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res, _) => {
    // res.send(req.user);
    res.redirect("/.netlify/functions/app/profile");
  }
);

module.exports = router;
