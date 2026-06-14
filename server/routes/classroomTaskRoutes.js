const express =
  require("express");

const router =
  express.Router();

const {
  createClassroomTask,
  getClassroomTasks,
  completeClassroomTask,
} = require(
  "../controllers/classroomTaskController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/:id/tasks",
  protect,
  createClassroomTask
);

router.get(
  "/:id/tasks",
  protect,
  getClassroomTasks
);

router.put(
  "/tasks/:taskId/complete",
  protect,
  completeClassroomTask
);

module.exports = router;