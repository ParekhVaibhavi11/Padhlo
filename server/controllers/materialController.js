const Material =
  require("../models/Material");

const cloudinary =
  require("../config/cloudinary");

const uploadMaterial =
  async (req, res) => {
    try {

      const result =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            resource_type:
              "raw",
            folder:
              "padhlo-materials",
          }
        );

      const material =
      await Material.create({
        user:
          req.user._id,

        title:
          req.body.title,

        subject:
          req.body.subject,

        fileUrl:
          result.secure_url,

        publicId:
          result.public_id,

        fileType:
          req.file.mimetype,
      });

      res.status(201).json({
        success: true,
        material,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
};

const getMaterials =
  async (req, res) => {
    try {

      const materials =
        await Material.find({
          user:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        materials,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
};

const deleteMaterial =
  async (req, res) => {

    try {

      const material =
        await Material.findOne({
          _id:
            req.params.id,

          user:
            req.user._id,
        });

      if (!material) {

        return res.status(404).json({
          success: false,
          message:
            "Material not found",
        });

      }

      if (
        material.publicId
      ) {

        await cloudinary.uploader.destroy(
          material.publicId,
          {
            resource_type:
              "raw",
          }
        );

      }

      await material.deleteOne();

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

module.exports = {
  uploadMaterial,
  getMaterials,
  deleteMaterial,
};