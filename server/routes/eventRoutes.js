const express = require("express");

const router =
  express.Router();

const {
  createEvent,
  getEvents,
  deleteEvent,
} = require(
  "../controllers/EventController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createEvent
);

router.get(
  "/",
  protect,
  getEvents
);

router.delete(
  "/:id",
  protect,
  deleteEvent
);

module.exports = router;