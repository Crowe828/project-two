// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    }
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    }
    res.render("signup");
  });

  app.get("/reports", (req, res) => {
      res.render("report");

  });


  app.get("/sightings", (req, res) => {
    // If the user already has an account
    if (req.user) {
      db.Post.findAll({
        where: {
          UserId: req.user.id
        }
      })
        .then(function(results) {
          
          console.log(results)
          res.render("mySightings", results);
        });
    }
    console.log("youre not logged in")
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("index");
  });
};
