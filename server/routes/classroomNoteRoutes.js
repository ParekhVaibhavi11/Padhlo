const express =
  require("express");

const router =
  express.Router();

const {
  uploadNote,
  shareLink,
  getNotes,
} = require(
  "../controllers/classroomNoteController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const upload =
  require(
    "../middleware/uploadMiddleware"
  );

router.post(
  "/:id/notes/upload",
  protect,
  upload.single("file"),
  uploadNote
);

router.post(
  "/:id/notes/link",
  protect,
  shareLink
);

router.get(
  "/:id/notes",
  protect,
  getNotes
);

module.exports =
  router;