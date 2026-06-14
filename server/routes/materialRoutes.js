const express =
  require("express");

const router =
  express.Router();

const {
  uploadMaterial,
  getMaterials,
  deleteMaterial,
} = require(
  "../controllers/materialController"
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
  "/",
  protect,
  upload.single("file"),
  uploadMaterial
);

router.get(
  "/",
  protect,
  getMaterials
);

router.delete(
  "/:id",
  protect,
  deleteMaterial
);

module.exports =
  router;