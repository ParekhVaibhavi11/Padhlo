const TaskCard = ({
  task,
  onComplete,
  onDelete,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">

      <div className="flex justify-between items-start">

        <div>

          <h3
            className={`text-lg font-semibold ${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>

          <p className="text-gray-500 mt-1">
            {task.description}
          </p>

          {task.deadline && (
            <p className="text-sm text-gray-400 mt-2">
              Deadline:{" "}
              {new Date(
                task.deadline
              ).toLocaleDateString()}
            </p>
          )}

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
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

      <div className="flex gap-3 mt-4">

        <button
          onClick={() =>
            onComplete(task._id)
          }
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          {task.completed
            ? "Undo"
            : "Complete"}
        </button>

        <button
          onClick={() =>
            onDelete(task._id)
          }
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default TaskCard;