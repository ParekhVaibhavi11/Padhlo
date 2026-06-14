const ClassroomTaskCard = ({
  task,
  onComplete,
  isCompleted,
}) => {
  return (
    <div className="border rounded-xl p-4">

      <div className="flex justify-between items-center">

        <div>

          <h3
            className={`font-medium ${
              isCompleted
                ? "line-through text-gray-400"
                : ""
            }`}
          >
            {task.title}
          </h3>

          <p className="text-sm text-gray-500">
            {task.description}
          </p>

        </div>

        <button
          disabled={isCompleted}
          onClick={() =>
            onComplete(task._id)
          }
          className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300"
        >
          {isCompleted
            ? "Completed"
            : "Complete"}
        </button>

      </div>

      {task.completedBy?.length >
        0 && (
        <div className="mt-3">

          <p className="text-sm font-medium text-gray-600">
            Completed By
          </p>

          <div className="flex flex-wrap gap-2 mt-2">

            {task.completedBy.map(
              (member) => (
                <span
                  key={member._id}
                  className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                >
                  {member.name}
                </span>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default ClassroomTaskCard;