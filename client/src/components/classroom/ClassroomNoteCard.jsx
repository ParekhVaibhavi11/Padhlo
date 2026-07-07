import {
  FileText,
  Link as LinkIcon,
  Trash2,
  ExternalLink,
} from "lucide-react";

const ClassroomNoteCard = ({
  note,
  onDelete,
}) => {

  return (

    <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300">

      <div className="flex justify-between items-start gap-6">

        {/* Left */}

        <div className="flex gap-4 flex-1">

          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center

            ${
              note.noteType === "file"
                ? "bg-violet-100"
                : "bg-blue-100"
            }`}
          >

            {note.noteType === "file" ? (

              <FileText
                size={28}
                className="text-violet-600"
              />

            ) : (

              <LinkIcon
                size={28}
                className="text-blue-600"
              />

            )}

          </div>

          <div className="flex-1">

            <h3 className="text-lg font-semibold text-slate-900">
              {note.title}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Uploaded by{" "}
              <span className="font-medium">
                {note.uploadedBy?.name}
              </span>
            </p>

            <div className="mt-3">

              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold

                ${
                  note.noteType === "file"
                    ? "bg-violet-100 text-violet-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >

                {note.noteType === "file"
                  ? "PDF Note"
                  : "Resource Link"}

              </span>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex gap-3">

          {note.noteType === "file" ? (

            <a
              href={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
                note.fileUrl
              )}`}
              target="_blank"
              rel="noreferrer"
              className="h-11 px-5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 transition"
            >

              <ExternalLink size={18} />

              Open

            </a>

          ) : (

            <a
              href={note.linkUrl}
              target="_blank"
              rel="noreferrer"
              className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition"
            >

              <ExternalLink size={18} />

              Visit

            </a>

          )}

          <button
            onClick={() => onDelete(note._id)}
            className="h-11 w-11 rounded-xl bg-red-100 hover:bg-red-600 text-red-600 hover:text-white flex items-center justify-center transition"
          >

            <Trash2 size={18} />

          </button>

        </div>

      </div>

    </div>

  );

};

export default ClassroomNoteCard;