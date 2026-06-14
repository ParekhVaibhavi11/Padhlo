import { useState } from "react";

const TaskForm = ({
  onAddTask,
}) => {
  const [task, setTask] =
    useState({
      title: "",
      description: "",
      deadline: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddTask(task);

    setTask({
      title: "",
      description: "",
      deadline: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
    >
      <h2 className="text-xl font-semibold">
        Add New Task
      </h2>

      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) =>
          setTask({
            ...task,
            title: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
        required
      />

      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) =>
          setTask({
            ...task,
            description:
              e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="date"
        value={task.deadline}
        onChange={(e) =>
          setTask({
            ...task,
            deadline:
              e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <button
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;