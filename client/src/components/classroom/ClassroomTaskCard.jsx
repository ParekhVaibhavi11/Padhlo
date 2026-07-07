import { CheckCircle2, Clock } from "lucide-react";

const ClassroomTaskCard = ({
  task,
  onComplete,
  isCompleted,
}) => {

  return (

    <div
      className={`group rounded-2xl border p-5 transition-all duration-300 hover:shadow-md

      ${
        isCompleted
          ? "border-green-200 bg-green-50"
          : "border-slate-200 bg-white hover:border-violet-300"
      }`}
    >

      <div className="flex justify-between items-start gap-5">

        {/* Left */}

        <div className="flex-1">

          <div className="flex items-center gap-3">

            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center

              ${
                isCompleted
                  ? "bg-green-100"
                  : "bg-violet-100"
              }`}
            >

              {isCompleted ? (

                <CheckCircle2
                  size={22}
                  className="text-green-600"
                />

              ) : (

                <Clock
                  size={22}
                  className="text-violet-600"
                />

              )}

            </div>

            <div>

              <h3
                className={`text-lg font-semibold

                ${
                  isCompleted
                    ? "line-through text-slate-400"
                    : "text-slate-900"
                }`}
              >
                {task.title}
              </h3>

            </div>

          </div>

          {task.description && (

            <p className="mt-4 text-slate-600 leading-relaxed">
              {task.description}
            </p>

          )}

        </div>

        {/* Right */}

        <button
          disabled={isCompleted}
          onClick={() =>
            onComplete(task._id)
          }
          className={`h-11 px-5 rounded-xl font-semibold transition-all

          ${
            isCompleted
              ? "bg-green-500 text-white cursor-default"
              : "bg-violet-600 hover:bg-violet-700 text-white shadow-md hover:shadow-lg"
          }`}
        >

          {isCompleted
            ? "Completed"
            : "Complete"}

        </button>

      </div>

      {/* Completed Members */}

      {task.completedBy?.length > 0 && (

        <div className="mt-6 border-t border-slate-200 pt-4">

          <p className="text-sm font-semibold text-slate-600 mb-3">
            Completed By
          </p>

          <div className="flex flex-wrap gap-2">

            {task.completedBy.map((member) => (

              <span
                key={member._id}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {member.name}
              </span>

            ))}

          </div>

        </div>

      )}

    </div>

  );

};

export default ClassroomTaskCard;