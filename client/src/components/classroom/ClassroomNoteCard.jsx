const ClassroomNoteCard = ({
  note,
  onDelete,
}) => {
  return (
  <div className="border rounded-xl p-4 flex justify-between items-center">

    <div>

      <h3 className="font-medium">
        {note.title}
      </h3>

      <p className="text-sm text-gray-500">
        Uploaded by{" "}
        {note.uploadedBy?.name}
      </p>

    </div>

    <div className="flex gap-2">

      {note.noteType === "file" ? (

        <a
          href={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
            note.fileUrl
          )}`}
          target="_blank"
          rel="noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          Open PDF
        </a>

      ) : (

        <a
          href={note.linkUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          Open Link
        </a>

      )}

      <button
        onClick={() =>
          onDelete(
            note._id
          )
        }
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Delete
      </button>

    </div>

  </div>
);
};

export default ClassroomNoteCard;