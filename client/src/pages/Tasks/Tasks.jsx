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

      <div className="space-y-6">

        <TaskForm
          onAddTask={
            handleAddTask
          }
        />

        <div className="grid gap-4">

          {tasks.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl border border-gray-100">

              <p className="text-gray-500">
                No tasks found.
              </p>

            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onComplete={
                  handleCompleteTask
                }
                onDelete={
                  handleDeleteTask
                }
              />
            ))
          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Tasks;