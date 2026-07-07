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

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          📚 Study Materials
        </h1>

        <p className="mt-2 text-slate-500">
          Upload, organize and access your study resources anytime.
        </p>

      </div>

      {/* Upload Section */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="h-2 bg-gradient-to-r from-violet-600 to-purple-600"></div>

        <div className="p-6">

          <h2 className="text-2xl font-bold text-slate-900">
            Upload Material
          </h2>

          <p className="mt-1 text-slate-500">
            Share notes, PDFs, presentations and other study files.
          </p>

          <form
            onSubmit={handleUpload}
            className="mt-6 space-y-5"
          >

            <input
              type="text"
              placeholder="Material Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              required
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />

            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            />

            <button
              disabled={uploading}
              className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg disabled:opacity-60"
            >

              {uploading
                ? "Uploading..."
                : "Upload Material"}

            </button>

          </form>

        </div>

      </div>

      {/* Materials Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            All Materials
          </h2>

          <p className="mt-1 text-slate-500">
            Your uploaded study resources.
          </p>

        </div>

        <div className="rounded-xl bg-violet-100 px-4 py-2">

          <span className="font-semibold text-violet-700">

            {materials.length} Materials

          </span>

        </div>

      </div>

      {/* Materials Grid */}

      {materials.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">

          <div className="text-6xl">
            📚
          </div>

          <h3 className="mt-4 text-2xl font-bold text-slate-800">
            No Materials Uploaded
          </h3>

          <p className="mt-2 text-slate-500">
            Upload your first study material to get started.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {materials.map((material) => (

            <div
              key={material._id}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl"
            >

              <h3 className="text-xl font-bold text-slate-900">

                {material.title}

              </h3>

              <p className="mt-2 text-slate-500">

                {material.subject || "General"}

              </p>

              <div className="mt-6 flex gap-3">

                <a
                  href={getViewerUrl(material)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-xl bg-violet-600 py-2 text-center font-medium text-white transition hover:bg-violet-700"
                >
                  Open
                </a>

                <button
                  onClick={() =>
                    handleDelete(material._id)
                  }
                  className="rounded-xl bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </DashboardLayout>
);
};

export default Materials;