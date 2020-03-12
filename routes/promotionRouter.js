const express = require("express");
const bodyParser = require("body-parser");

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all the promotions");
  })
  .post((req, res, next) => {
    res.end(
      `Will send the promotion: ${req.body.name} with details ${req.body.description}`
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /promotions");
  })
  .delete((req, res, next) => {
    res.end("Deleting all the promotions!");
  });

promotionRouter
  .route("/:promoId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end(`Sending the promotion: ${req.params.promoId} to you`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post operation is not supported on /promotion/promoId");
  })
  .put((req, res, next) => {
    res.write(`Updating the promotion with ID ${req.params.promoId} \n`);
    res.end(
      `New promotion is ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res, next) => {
    res.end(`Will delete the promotion with ID: ${req.params.promoId}`);
  });

module.exports = promotionRouter;
