const mongoose =
  require("mongoose");

const materialSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      subject: {
        type: String,
        default: "",
      },

      fileUrl: {
        type: String,
        default: "",
      },

      fileType: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Material",
    materialSchema
  );