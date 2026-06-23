const ClassroomNote =
  require(
    "../models/ClassroomNote"
  );

const cloudinary =
  require(
    "../config/cloudinary"
  );

  const uploadNote = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result =
      await cloudinary.uploader.upload(
        req.file.path,
        {
          resource_type: "raw",
          folder: "padhlo-notes",
        }
      );

    const note =
      await ClassroomNote.create({
        classroom: req.params.id,

        title: req.body.title,

        noteType: "file",

        fileUrl:
          result.secure_url,

        publicId:
          result.public_id,

        uploadedBy:
          req.user._id,
      });

    res.status(201).json({
      success: true,
      note,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
  const shareLink =
  async (req, res) => {
    try {

      const note =
        await ClassroomNote.create({
          classroom:
            req.params.id,

          title:
            req.body.title,

          noteType:
            "link",

          linkUrl:
            req.body.linkUrl,

          uploadedBy:
            req.user._id,
        });

      res.status(201).json({
        success: true,
        note,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

  const getNotes =
  async (req, res) => {
    try {

      const notes =
        await ClassroomNote.find({
          classroom:
            req.params.id,
        }).populate(
          "uploadedBy",
          "name"
        );

      res.status(200).json({
        success: true,
        notes,
      });

    } catch (error) {

  res.status(500).json({
    success: false,
    message: error.message,
  });

}
  };

const deleteNote =
  async (req, res) => {

    try {

      const note =
        await ClassroomNote.findById(
          req.params.noteId
        );

      if (!note) {

        return res.status(404).json({
          success: false,
          message:
            "Note not found",
        });

      }

      if (
        note.publicId
      ) {

        await cloudinary.uploader.destroy(
          note.publicId,
          {
            resource_type:
              "raw",
          }
        );

      }

      await note.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Note deleted",
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
  uploadNote,
  shareLink,
  getNotes,
  deleteNote,
};