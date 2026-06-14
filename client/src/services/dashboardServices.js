import { getTasks } from "./taskService";

export const getDashboardStats =
  async () => {
    const data = await getTasks();

    const tasks = data.tasks;

    const totalTasks =
      tasks.length;

    const completedTasks =
      tasks.filter(
        (task) =>
          task.completed
      ).length;

    const pendingTasks =
      totalTasks -
      completedTasks;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
    };
  };