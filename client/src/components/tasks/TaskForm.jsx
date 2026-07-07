import { useState } from "react";
import { PlusCircle } from "lucide-react";

const TaskForm = ({ onAddTask }) => {

  const [task, setTask] = useState({
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
      className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
    >

      {/* Header */}

      <div className="h-2 bg-gradient-to-r from-violet-600 to-purple-600"></div>

      <div className="p-7">

        <div className="flex items-center gap-4 mb-7">

          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

            <PlusCircle
              size={30}
              className="text-violet-600"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Add New Task
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Create a personal task and stay productive.
            </p>

          </div>

        </div>

        <div className="space-y-5">

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
            className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          <textarea
            placeholder="Task Description"
            rows={4}
            value={task.description}
            onChange={(e) =>
              setTask({
                ...task,
                description: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-slate-300 px-5 py-3 resize-none outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            type="date"
            value={task.deadline}
            onChange={(e) =>
              setTask({
                ...task,
                deadline: e.target.value,
              })
            }
            className="w-full rounded-2xl border border-slate-300 px-5 py-3 outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-300/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Add Task
          </button>

        </div>

      </div>

    </form>

  );

};

export default TaskForm;