const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all the leaders");
  })
  .post((req, res, next) => {
    res.end(
      `Will send the leader: ${req.body.name} with details ${req.body.description}`
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /leaders");
  })
  .delete((req, res, next) => {
    res.end("Deleting all the leaders!");
  });

leaderRouter
  .route("/:leaderId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end(`Sending the leader: ${req.params.leaderId} to you`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post operation is not supported on /leader/leaderId");
  })
  .put((req, res, next) => {
    res.write(`Updating the leader with ID ${req.params.leaderId} \n`);
    res.end(
      `New leader is ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res, next) => {
    res.end(`Will delete the leader with ID: ${req.params.leaderId}`);
  });

module.exports = leaderRouter;
