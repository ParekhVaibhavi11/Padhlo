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

import ClassroomNoteCard from "../../components/classroom/ClassroomNoteCard";

import {
  getNotes,
  uploadNote,
  shareNoteLink,
} from "../../services/classroomNoteService";

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

  const [notes, setNotes] =
  useState([]);

const [noteTitle,
  setNoteTitle] =
  useState("");

const [selectedFile,
  setSelectedFile] =
  useState(null);

const [linkTitle,
  setLinkTitle] =
  useState("");

const [linkUrl,
  setLinkUrl] =
  useState("");

  const loadNotes =
  async () => {
    try {

      const data =
        await getNotes(id);

      setNotes(
        data.notes
      );

    } catch (error) {

      toast.error(
        "Failed to load notes"
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
    loadNotes();
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

  const progressData = {};

tasks.forEach((task) => {
  task.completedBy?.forEach(
    (member) => {
      const memberId =
        member._id;

      if (
        !progressData[
          memberId
        ]
      ) {
        progressData[
          memberId
        ] = {
          name:
            member.name,
          completed: 0,
        };
      }

      progressData[
        memberId
      ].completed += 1;
    }
  );
});



const leaderboard =
  Object.values(
    progressData
  ).sort(
    (a, b) =>
      b.completed -
      a.completed
  );

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

const handleUploadNote =
  async (e) => {
    e.preventDefault();

    try {

      const formData =
        new FormData();

      formData.append(
        "title",
        noteTitle
      );

      formData.append(
        "file",
        selectedFile
      );

      await uploadNote(
        id,
        formData
      );

      toast.success(
        "Note uploaded"
      );

      setNoteTitle("");
      setSelectedFile(
        null
      );

      loadNotes();

    } catch (error) {

      toast.error(
        "Upload failed"
      );

    }
  };

  const handleShareLink =
  async (e) => {
    e.preventDefault();

    try {

      await shareNoteLink(
        id,
        {
          title:
            linkTitle,
          linkUrl,
        }
      );

      toast.success(
        "Link shared"
      );

      setLinkTitle("");
      setLinkUrl("");

      loadNotes();

    } catch (error) {

      toast.error(
        "Failed to share link"
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

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

  <h2 className="text-xl font-semibold mb-4">
    Progress Tracking
  </h2>

  <div className="space-y-3">

    {classroom.members.map(
      (member) => {
        const memberProgress =
          progressData[
            member._id
          ];

        return (
          <div
            key={
              member._id
            }
            className="border rounded-lg p-3"
          >
            <div className="flex justify-between">

              <span>
                {member.name}
              </span>

              <span className="font-medium text-purple-700">

                {
                  memberProgress
                    ?.completed ||
                    0
                }
                /
                {
                  tasks.length
                }

              </span>

            </div>

          </div>
        );
      }
    )}

  </div>

</div>

<div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

  <h2 className="text-xl font-semibold mb-4">
    🏆 Leaderboard
  </h2>

  <div className="space-y-3">

    {leaderboard.length ===
    0 ? (
      <p className="text-gray-500">
        No progress yet.
      </p>
    ) : (
      leaderboard.map(
        (
          member,
          index
        ) => (
          <div
            key={
              member.name
            }
            className="flex justify-between border rounded-lg p-3"
          >
            <span>

              #{index + 1}
              {" "}
              {member.name}

            </span>

            <span className="font-semibold text-purple-700">
              {
                member.completed
              }
              {" "}
              Tasks
            </span>

          </div>
        )
      )
    )}

  </div>

</div>

<div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

  <h2 className="text-xl font-semibold mb-6">
    Notes & Resources
  </h2>

  {/* Upload File */}

  <form
    onSubmit={handleUploadNote}
    className="space-y-3 mb-8"
  >

    <h3 className="font-medium">
      Upload Note
    </h3>

    <input
      type="text"
      placeholder="Note Title"
      value={noteTitle}
      onChange={(e) =>
        setNoteTitle(
          e.target.value
        )
      }
      className="w-full border p-3 rounded-lg"
      required
    />

    <input
      type="file"
      onChange={(e) =>
        setSelectedFile(
          e.target.files[0]
        )
      }
      className="w-full border p-3 rounded-lg"
      required
    />

    <button
      className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
    >
      Upload Note
    </button>

  </form>

  {/* Share Link */}

  <form
    onSubmit={handleShareLink}
    className="space-y-3 mb-8"
  >

    <h3 className="font-medium">
      Share Resource Link
    </h3>

    <input
      type="text"
      placeholder="Link Title"
      value={linkTitle}
      onChange={(e) =>
        setLinkTitle(
          e.target.value
        )
      }
      className="w-full border p-3 rounded-lg"
      required
    />

    <input
      type="url"
      placeholder="https://..."
      value={linkUrl}
      onChange={(e) =>
        setLinkUrl(
          e.target.value
        )
      }
      className="w-full border p-3 rounded-lg"
      required
    />

    <button
      className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
    >
      Share Link
    </button>

  </form>

  {/* Notes List */}

  <div className="space-y-3">

    {notes.length === 0 ? (
      <p className="text-gray-500">
        No notes shared yet.
      </p>
    ) : (
      notes.map((note) => (
        <ClassroomNoteCard
          key={note._id}
          note={note}
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