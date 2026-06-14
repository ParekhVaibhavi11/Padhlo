import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import useAuthStore from "../../store/authStore";

import ClassroomTaskCard from "../../components/classroom/ClassroomTaskCard";

import {
  getClassroomById,
} from "../../services/classroomService";

import {
  getClassroomTasks,
  createClassroomTask,
  completeClassroomTask,
} from "../../services/classroomTaskService";

const ClassroomDetails = () => {
  const { id } = useParams();

  const [classroom, setClassroom] =
    useState(null);

  const [tasks, setTasks] =
    useState([]);

  const [newTask, setNewTask] =
    useState({
      title: "",
      description: "",
    });

  const user = useAuthStore(
    (state) => state.user
  );

  const loadTasks = async () => {
    try {
      const data =
        await getClassroomTasks(id);

      setTasks(data.tasks);
    } catch (error) {
      toast.error(
        "Failed to load tasks"
      );
    }
  };

  useEffect(() => {
    const loadClassroom =
      async () => {
        try {
          const data =
            await getClassroomById(id);

          setClassroom(
            data.classroom
          );
        } catch (error) {
          toast.error(
            "Failed to load classroom"
          );
        }
      };

    loadClassroom();
    loadTasks();
  }, [id]);

  if (!classroom) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500">
            Loading classroom...
          </p>
        </div>
      </DashboardLayout>
    );
  }

 
const currentUserId =
  user?._id || user?.id;

const isCreator =
  classroom.createdBy?._id?.toString() ===
  currentUserId?.toString();

  const handleCreateTask =
    async (e) => {
      e.preventDefault();

      try {
        await createClassroomTask(
          id,
          newTask
        );

        toast.success(
          "Task added"
        );

        setNewTask({
          title: "",
          description: "",
        });

        loadTasks();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to create task"
        );
      }
    };

  const handleCompleteTask =
    async (taskId) => {
      try {
        await completeClassroomTask(
          taskId
        );

        toast.success(
          "Task completed"
        );

        loadTasks();
      } catch (error) {
        toast.error(
          "Failed to update task"
        );
      }
    };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Classroom Info */}

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">

          <h1 className="text-3xl font-bold">
            {classroom.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {classroom.description}
          </p>

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Room Code
            </p>

            <p className="font-semibold text-purple-700 tracking-wider">
              {classroom.roomCode}
            </p>
          </div>

        </div>

        {/* Members */}

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Members
          </h2>

          <div className="space-y-3">

            {classroom.members.map(
              (member) => (
                <div
                  key={member._id}
                  className="border rounded-lg p-3"
                >
                  <p className="font-medium">
                    {member.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {member.email}
                  </p>
                </div>
              )
            )}

          </div>

        </div>

        {/* Classroom Tasks */}

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Classroom Tasks
          </h2>

          {isCreator && (
            <form
              onSubmit={
                handleCreateTask
              }
              className="space-y-3 mb-6"
            >

              <input
                type="text"
                placeholder="Task Title"
                value={
                  newTask.title
                }
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    title:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
                required
              />

              <textarea
                placeholder="Description"
                value={
                  newTask.description
                }
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    description:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />

              <button
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
              >
                Add Classroom Task
              </button>

            </form>
          )}

          <div className="space-y-3">

            {tasks.length === 0 ? (
              <p className="text-gray-500">
                No classroom tasks yet.
              </p>
            ) : (
              tasks.map((task) => (
                <ClassroomTaskCard
                  key={task._id}
                  task={task}
                  onComplete={
                    handleCompleteTask
                  }
                  isCompleted={
                    task.completedBy?.some(
                      (member) =>
                        member.toString() ===
                        currentUserId?.toString()
                    )
                  }
                />
              ))
            )}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default ClassroomDetails;