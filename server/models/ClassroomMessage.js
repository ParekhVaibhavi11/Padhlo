const mongoose =
  require("mongoose");

const classroomMessageSchema =
  new mongoose.Schema(
    {
      classroom: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Classroom",
        required: true,
      },

      sender: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      senderName: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "ClassroomMessage",
    classroomMessageSchema
  );