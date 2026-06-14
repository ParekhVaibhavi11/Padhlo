const Classroom = require(
  "../models/Classroom"
);

const generateRoomCode = require(
  "../utils/generateRoomCode"
);

const createClassroom = async (
  req,
  res
) => {
  try {

    const {
      name,
      description,
    } = req.body;

    const classroom =
      await Classroom.create({
        name,
        description,

        roomCode:
          generateRoomCode(),

        createdBy:
          req.user._id,

        members: [
          req.user._id,
        ],
      });

    res.status(201).json({
      success: true,
      classroom,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getClassrooms =
  async (req, res) => {
    try {

      const classrooms =
        await Classroom.find({
          members:
            req.user._id,
        });

      res.status(200).json({
        success: true,
        classrooms,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };


  const joinClassroom = async (
  req,
  res
) => {
  try {

    const { roomCode } =
      req.body;

    const classroom =
      await Classroom.findOne({
        roomCode,
      });

    if (!classroom) {
      return res.status(404).json({
        success: false,
        message:
          "Classroom not found",
      });
    }
const alreadyJoined =
  classroom.members.some(
    (member) =>
      member.toString() ===
      req.user._id.toString()
  );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message:
          "Already joined",
      });
    }

    classroom.members.push(
      req.user._id
    );

    await classroom.save();

    res.status(200).json({
      success: true,
      classroom,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const getClassroomById =
  async (req, res) => {
    try {

      const classroom =
        await Classroom.findById(
          req.params.id
        )
          .populate(
            "members",
            "name email"
          )
          .populate(
            "createdBy",
            "name email"
          );

      if (!classroom) {
        return res.status(404).json({
          success: false,
          message:
            "Classroom not found",
        });
      }

      res.status(200).json({
        success: true,
        classroom,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  };
  
module.exports = {
  createClassroom,
  getClassrooms,
   joinClassroom,
   getClassroomById,
};