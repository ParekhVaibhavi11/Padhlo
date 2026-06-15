
const ClassroomMessage =
  require(
    "../models/ClassroomMessage"
  );

const getMessages =
  async (req, res) => {
    try {

      const messages =
        await ClassroomMessage
          .find({
            classroom:
              req.params.id,
          })
          .sort({
            createdAt: 1,
          });

      res.status(200).json({
        success: true,
        messages,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
};

const saveMessage =
  async (req, res) => {
    try {

      const newMessage =
        await ClassroomMessage.create({
          classroom:
            req.params.id,

          sender:
            req.user._id,

          senderName:
            req.user.name,

          message:
            req.body.message,
        });

      res.status(201).json({
        success: true,
        message:
          newMessage,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
};

const deleteMessage =
  async (req, res) => {
    try {

      const message =
        await ClassroomMessage.findById(
          req.params.messageId
        );

      if (!message) {
        return res.status(404).json({
          success: false,
          message: "Message not found",
        });
      }

      if (
        message.sender.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      await message.deleteOne();

      res.status(200).json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
};

const editMessage =
  async (req, res) => {
    try {

      const message =
        await ClassroomMessage.findById(
          req.params.messageId
        );

      if (!message) {
        return res.status(404).json({
          success: false,
          message: "Message not found",
        });
      }

      if (
        message.sender.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      message.message =
        req.body.message;

      await message.save();

      res.status(200).json({
        success: true,
        message,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
};

module.exports = {
  getMessages,
  saveMessage,
  editMessage,
  deleteMessage,
};