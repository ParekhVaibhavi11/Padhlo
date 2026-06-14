const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {

    const event =
      await Event.create({
        title: req.body.title,
        date: req.body.date,
        createdBy: req.user._id,
      });

    res.status(201).json({
      success: true,
      event,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getEvents = async (req, res) => {
  try {

    const events =
      await Event.find({
        createdBy: req.user._id,
      }).sort({
        date: 1,
      });

    res.status(200).json({
      success: true,
      events,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteEvent = async (req, res) => {
  try {

    await Event.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Event deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createEvent,
  getEvents,
  deleteEvent,
};