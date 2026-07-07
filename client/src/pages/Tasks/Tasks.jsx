import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import TaskForm from "../../components/tasks/TaskForm";
import TaskCard from "../../components/tasks/TaskCard";

import {
  getTasks,
  createTask,
  completeTask,
  deleteTask,
} from "../../services/taskService";

const Tasks = () => {
  const [tasks, setTasks] =
    useState([]);

  const loadTasks = async () => {
    try {
      const data =
        await getTasks();

      setTasks(data.tasks);

    } catch (error) {

      toast.error(
        "Failed to load tasks"
      );

    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (
    taskData
  ) => {
    try {

      await createTask(taskData);

      toast.success(
        "Task created"
      );

      loadTasks();

    } catch (error) {

      toast.error(
        "Failed to create task"
      );

    }
  };

  const handleCompleteTask =
    async (taskId) => {
      try {

        await completeTask(taskId);

        toast.success(
          "Task updated"
        );

        loadTasks();

      } catch (error) {

        toast.error(
          "Failed to update task"
        );

      }
    };

  const handleDeleteTask =
    async (taskId) => {
      try {

        await deleteTask(taskId);

        toast.success(
          "Task deleted"
        );

        loadTasks();

      } catch (error) {

        toast.error(
          "Failed to delete task"
        );

      }
    };

    return (
  <DashboardLayout>

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          ✅ My Tasks
        </h1>

        <p className="mt-2 text-slate-500">
          Create, organize and complete your daily study tasks.
        </p>

      </div>

      {/* Task Form */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        

       

          <TaskForm
            onAddTask={handleAddTask}
          />

    

      </div>

      {/* Task Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            All Tasks
          </h2>

          <p className="mt-1 text-slate-500">
            Stay productive by completing your daily goals.
          </p>

        </div>

        <div className="flex gap-3">

          <div className="rounded-xl bg-violet-100 px-4 py-2">

            <span className="font-semibold text-violet-700">

              {tasks.length} Tasks

            </span>

          </div>

          <div className="rounded-xl bg-green-100 px-4 py-2">

            <span className="font-semibold text-green-700">

              {tasks.filter(task => task.completed).length} Completed

            </span>

          </div>

          <div className="rounded-xl bg-yellow-100 px-4 py-2">

            <span className="font-semibold text-yellow-700">

              {tasks.filter(task => !task.completed).length} Pending

            </span>

          </div>

        </div>

      </div>

      {/* Task List */}

      {tasks.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">

          <div className="text-6xl">

            📋

          </div>

          <h3 className="mt-4 text-2xl font-bold text-slate-800">

            No Tasks Yet

          </h3>

          <p className="mt-2 text-slate-500">

            Add your first task to start tracking your progress.

          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {tasks.map((task) => (

            <TaskCard
              key={task._id}
              task={task}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />

          ))}

        </div>

      )}

    </div>

  </DashboardLayout>
);
};

export default Tasks;