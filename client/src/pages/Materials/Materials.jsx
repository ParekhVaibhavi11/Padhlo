import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getMaterials,
  uploadMaterial,
  deleteMaterial,
} from "../../services/materialService";

const Materials = () => {

  const [materials,
    setMaterials] =
    useState([]);

  const [uploading,
  setUploading] =
  useState(false);

  const [title,
    setTitle] =
    useState("");

  const [subject,
    setSubject] =
    useState("");

  const [file,
    setFile] =
    useState(null);

  const loadMaterials =
    async () => {
      try {

        const data =
          await getMaterials();

        setMaterials(
          data.materials
        );

      } catch {

        toast.error(
          "Failed to load materials"
        );

      }
    };

  useEffect(() => {
    loadMaterials();
  }, []);

 const handleUpload =
  async (e) => {

    e.preventDefault();

    if (!file) {
      return toast.error(
        "Choose a file"
      );
    }

    try {

      setUploading(
        true
      );

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "subject",
        subject
      );

      formData.append(
        "file",
        file
      );

      await uploadMaterial(
        formData
      );

      setUploading(
        false
      );

      toast.success(
        "Material Uploaded"
      );

      setTitle("");
      setSubject("");
      setFile(null);

      loadMaterials();

    } catch {

      setUploading(
        false
      );

      toast.error(
        "Upload Failed"
      );

    }

};

  const handleDelete =
    async (id) => {
      try {

        await deleteMaterial(
          id
        );

        toast.success(
          "Deleted"
        );

        loadMaterials();

      } catch {

        toast.error(
          "Delete Failed"
        );

      }
    };

    const getViewerUrl =
  (material) => {

    const url =
      encodeURIComponent(
        material.fileUrl
      );

    if (
      material.fileType.includes(
        "pdf"
      )
    ) {

      return material.fileUrl;

    }

    if (
      material.fileType.includes(
        "word"
      ) ||
      material.fileType.includes(
        "document"
      ) ||
      material.fileType.includes(
        "presentation"
      ) ||
      material.fileType.includes(
        "powerpoint"
      )
    ) {

      return `https://view.officeapps.live.com/op/view.aspx?src=${url}`;

    }

    return material.fileUrl;

  };

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* Upload */}

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

          <h1 className="text-2xl font-bold mb-4">
            Study Materials
          </h1>

          <form
            onSubmit={
              handleUpload
            }
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
              className="w-full border p-3 rounded-lg"
            />

            <button
              disabled={
                uploading
              }
              className="bg-purple-600 text-white px-6 py-3 rounded-lg disabled:opacity-60"
            >

              {uploading
                ? "Uploading..."
                : "Upload Material"}

            </button>

          </form>

        </div>

        {/* Materials */}

        <div className="grid md:grid-cols-2 gap-4">

          {materials.map(
            (material) => (

              <div
                key={
                  material._id
                }
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
              >

                <h3 className="font-semibold text-lg">

                  {material.title}

                </h3>

                <p className="text-gray-500 text-sm mt-1">

                  {material.subject}

                </p>

                <div className="flex gap-3 mt-4">

                  <a
                    href={
                       getViewerUrl(
                        material
                       )
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                  >
                    Open
                  </a>

                  <button
                    onClick={() =>
                      handleDelete(
                        material._id
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Materials;