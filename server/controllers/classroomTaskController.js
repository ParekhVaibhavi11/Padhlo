const Classroom =
  require("../models/Classroom");

const ClassroomTask =
  require(
    "../models/ClassroomTask"
  );

  const createClassroomTask =
  async (req, res) => {
    try {

      const classroom =
        await Classroom.findById(
          req.params.id
        );

      if (!classroom) {
        return res.status(404).json({
          success: false,
          message:
            "Classroom not found",
        });
      }

      if (
        classroom.createdBy.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Only creator can add tasks",
        });
      }

      const {
        title,
        description,
      } = req.body;

      const task =
        await ClassroomTask.create({
          classroom:
            classroom._id,

          title,
          description,

          createdBy:
            req.user._id,
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

  const getClassroomTasks =
  async (req, res) => {
    try {
const tasks =
  await ClassroomTask.find({
    classroom: req.params.id,
  }).populate(
    "completedBy",
    "name email"
  );

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

  const completeClassroomTask =
  async (req, res) => {
    try {

      const task =
        await ClassroomTask.findById(
          req.params.taskId
        );

      if (!task) {
        return res.status(404).json({
          success: false,
          message:
            "Task not found",
        });
      }

      const alreadyCompleted =
        task.completedBy.some(
          (member) =>
            member.toString() ===
            req.user._id.toString()
        );

      if (!alreadyCompleted) {

        task.completedBy.push(
          req.user._id
        );

        await task.save();
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

  module.exports = {
  createClassroomTask,
  getClassroomTasks,
  completeClassroomTask,
};