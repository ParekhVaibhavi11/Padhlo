import {
  CheckCircle2,
  Clock3,
  CalendarDays,
  Trash2,
  RotateCcw,
} from "lucide-react";

const TaskCard = ({
  task,
  onComplete,
  onDelete,
}) => {

  return (

    <div
      className={`group rounded-3xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1

      ${
        task.completed
          ? "bg-green-50 border-green-200"
          : "bg-white border-slate-200 hover:border-violet-300"
      }`}
    >

      {/* Header */}

      <div className="flex justify-between items-start gap-5">

        <div className="flex items-start gap-4 flex-1">

          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center

            ${
              task.completed
                ? "bg-green-100"
                : "bg-violet-100"
            }`}
          >

            {task.completed ? (

              <CheckCircle2
                size={28}
                className="text-green-600"
              />

            ) : (

              <Clock3
                size={28}
                className="text-violet-600"
              />

            )}

          </div>

          <div className="flex-1">

            <h3
              className={`text-xl font-bold

              ${
                task.completed
                  ? "line-through text-slate-400"
                  : "text-slate-900"
              }`}
            >
              {task.title}
            </h3>

            {task.description && (

              <p className="text-slate-600 mt-2 leading-relaxed">
                {task.description}
              </p>

            )}

            {task.deadline && (

              <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">

                <CalendarDays size={16} />

                <span>

                  {new Date(
                    task.deadline
                  ).toLocaleDateString()}

                </span>

              </div>

            )}

          </div>

        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold

          ${
            task.completed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >

          {task.completed
            ? "Completed"
            : "Pending"}

        </span>

      </div>

      {/* Buttons */}

      <div className="flex gap-3 mt-6">

        <button
          onClick={() =>
            onComplete(task._id)
          }
          className={`flex items-center gap-2 px-5 h-11 rounded-xl font-medium transition-all

          ${
            task.completed
              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
              : "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg"
          }`}
        >

          {task.completed ? (

            <RotateCcw size={18} />

          ) : (

            <CheckCircle2 size={18} />

          )}

          {task.completed
            ? "Undo"
            : "Complete"}

        </button>

        <button
          onClick={() =>
            onDelete(task._id)
          }
          className="flex items-center gap-2 px-5 h-11 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all"
        >

          <Trash2 size={18} />

          Delete

        </button>

      </div>

    </div>

  );

};

export default TaskCard;