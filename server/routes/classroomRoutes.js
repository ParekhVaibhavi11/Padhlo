const express = require(
  "express"
);

const router =
  express.Router();

const {
  createClassroom,
  joinClassroom,
  getClassrooms,
  getClassroomById,
  deleteClassroom,
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

router.delete(
  "/:id",
  protect,
  deleteClassroom
);

module.exports = router;