const express = require(
  "express"
);

const router =
  express.Router();

const {
  createClassroom,
  getClassrooms,
  joinClassroom,
  getClassroomById,
} = require(
  "../controllers/classroomController"
);


const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createClassroom
);

router.get(
  "/",
  protect,
  getClassrooms
);

router.get(
  "/:id",
  protect,
  getClassroomById
);

router.post(
  "/join",
  protect,
  joinClassroom
);

module.exports = router;