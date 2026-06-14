const mongoose = require("mongoose");

const classroomNoteSchema =
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
      },

      noteType: {
        type: String,
        enum: [
          "file",
          "link",
        ],
        required: true,
      },

      fileUrl: {
        type: String,
      },

      linkUrl: {
        type: String,
      },

      uploadedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "ClassroomNote",
    classroomNoteSchema
  );