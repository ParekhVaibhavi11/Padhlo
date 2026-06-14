const ClassroomNoteCard = ({
  note,
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

      {note.noteType ===
      "file" ? (
        <a
          href={note.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Download
        </a>
      ) : (
        <a
          href={note.linkUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Open Link
        </a>
      )}

    </div>
  );
};

export default ClassroomNoteCard;