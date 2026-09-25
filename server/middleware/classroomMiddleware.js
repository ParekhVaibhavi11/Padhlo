const Classroom = require("../models/Classroom");

const requireClassroomMember = async (
  req,
  res,
  next
) => {

  try {

    const classroomId =
      req.params.id ||
      req.params.classroomId;

    if (!classroomId) {

      return res.status(400).json({
        success: false,
        message:
          "Classroom ID is required",
      });

    }

    const classroom =
      await Classroom.findOne({
        _id: classroomId,
        members: req.user._id,
      });

    if (!classroom) {

      return res.status(403).json({
        success: false,
        message:
          "You are not a member of this classroom",
      });

    }

    req.classroom = classroom;

    next();

  } catch (error) {

    console.error(
      "Classroom authorization error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to verify classroom access",
    });

  }

};

module.exports =
  requireClassroomMember;