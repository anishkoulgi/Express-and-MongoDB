const express = require("express");
const bodyParser = require("body-parser");
const Favorites = require("../models/favorites");
var authenticate = require("../authenticate");

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .get(authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
      .populate("user dishes")
      .then(fav => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(fav);
      })
      .catch(err => {
        next(err);
      });
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
      .then(fav => {
        if (fav.length == 0) {
          console.log("In If");
          Favorites.create({ user: req.user._id, dishes: req.body }).then(
            fav => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(fav);
              next();
            }
          );
        } else {
          console.log(fav[0]);
          for (let i = 0; i < req.body.length; i++) {
            if (fav[0].dishes.indexOf(req.body[i]._id) == -1) {
              fav[0].dishes.push(req.body[i]._id);
            }
          }
          fav[0].save().then(fav => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(fav);
          });
        }
      })
      .catch(err => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.findOneAndRemove({ user: req.user._id })
      .then(fav => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(fav);
      })
      .catch(err => console.log(err));
  });

favoriteRouter
  .route("/:dishId")
  .post(authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
      .then(fav => {
        if (fav.length == 0) {
          console.log("In If");
          Favorites.create({ user: req.user._id })
            .then(fav => {
              fav.dishes.push(req.params.dishId);
              fav
                .save()
                .then(fav => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(fav);
                  next();
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        } else {
          if (fav[0].dishes.indexOf(req.params.dishId) == -1) {
            fav[0].dishes.push(req.params.dishId);
          }
          fav[0].save().then(fav => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(fav);
          });
        }
      })
      .catch(err => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
      .then(fav => {
        var index = fav[0].dishes.indexOf(req.params.dishId);
        if (index > -1) {
          fav[0].dishes.splice(index, 1);
        }
        fav[0].save().then(fav => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(fav);
        });
      })
      .catch(err => next(err));
  });

module.exports = favoriteRouter;
/*
[
    {
        "_id": "5e744c1a89330114b3ee537c"
    },
    {
        "_id": "5e788f70c7d60d1ef9c4e2b5"
    }
]
*/
