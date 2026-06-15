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

module.exports =
  router;