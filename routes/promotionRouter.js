const express = require("express");
const bodyParser = require("body-parser");
var authenticate = require("../authenticate");

const promotionRouter = express.Router();
const Promo = require("../models/promotions");

promotionRouter.use(bodyParser.json());

promotionRouter
  .route("/")
  .get((req, res, next) => {
    Promo.find({})
      .then(
        promo => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promo.create(req.body)
      .then(
        promo => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /promotions");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promo.remove({})
        .then(
          resp => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

promotionRouter
  .route("/:promoId")
  .get((req, res, next) => {
    Promo.findById(req.params.promoId)
      .then(
        promo => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("Post operation is not supported on /promotion/promoId");
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promo.findByIdAndUpdate(
      req.params.promoId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(
        promo => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promo);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promo.findByIdAndRemove(req.params.promoId)
        .then(
          resp => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

module.exports = promotionRouter;
