const express =
  require("express");

const router =
  express.Router();

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  getMessages,
  saveMessage,
  editMessage,
deleteMessage,
} = require(
  "../controllers/classroomChatController"
);

router.get(
  "/:id/chat",
  protect,
  getMessages
);

router.post(
  "/:id/chat",
  protect,
  saveMessage
);

router.put(
  "/chat/message/:messageId",
  protect,
  editMessage
);

router.delete(
  "/chat/message/:messageId",
  protect,
  deleteMessage
);

module.exports =
  router;