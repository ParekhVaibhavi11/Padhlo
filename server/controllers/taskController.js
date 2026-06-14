const Task = require("../models/Task");

const User = require("../models/User");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      deadline,
    } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      deadline,
    });

    res.status(201).json({
      success: true,
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const completeTask = async (req, res) => {
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.completed = !task.completed;

    await task.save();

    if (task.completed) {

      console.log("TASK COMPLETED");
console.log("USER ID:", req.user._id);

      const user =
        await User.findById(
          req.user._id
        );

      const today =
        new Date();

      today.setHours(
        0, 0, 0, 0
      );

      if (
        !user.lastTaskCompletedDate
      ) {

        user.streak = 1;

      } else {

        const lastDate =
          new Date(
            user.lastTaskCompletedDate
          );

        lastDate.setHours(
          0, 0, 0, 0
        );

        const diffDays =
          Math.floor(
            (
              today -
              lastDate
            ) /
            (
              1000 *
              60 *
              60 *
              24
            )
          );

        if (
          diffDays === 1
        ) {

          user.streak += 1;

        } else if (
          diffDays > 1
        ) {

          user.streak = 1;

        }

      }

      user.lastTaskCompletedDate =
        today;
        console.log("NEW STREAK:", user.streak);
console.log(
  "LAST DATE:",
  user.lastTaskCompletedDate
);

      await user.save();

    }

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const deleteTask = async (req, res) => {
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createTask,
  getTasks,
  completeTask,
  deleteTask,
};