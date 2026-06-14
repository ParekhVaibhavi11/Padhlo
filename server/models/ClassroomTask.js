const mongoose = require("mongoose");

const classroomTaskSchema =
  new mongoose.Schema(
    {
      classroom: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Classroom",
        required: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      completedBy: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "ClassroomTask",
  classroomTaskSchema
);