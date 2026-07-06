import { useEffect, useState, } from "react";
import { useParams, } from "react-router-dom";
import { useNavigate, } from "react-router-dom";

import { ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../../layouts/DashboardLayout";
import useAuthStore from "../../store/authStore";
import ClassroomTaskCard from "../../components/classroom/ClassroomTaskCard";
import ClassroomChat
from "../../components/classroom/ClassroomChat";
import { 
  getClassroomById, 
  deleteClassroom, 
  leaveClassroom
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
  deleteNote,
} from "../../services/classroomNoteService";

const ClassroomDetails = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [classroom, setClassroom] =
    useState(null);

  const [tasks, setTasks] =
    useState([]);

  const [newTask, setNewTask] =
    useState({
      title: "",
      description: "",
    });

  const [showMembers, setShowMembers] = useState(false);
  
  const [showNotes, setShowNotes] = useState(false);

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

        const [
          uploadingNote,
          setUploadingNote
        ] = useState(false);

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

    const handleDeleteNote =
  async (noteId) => {

    try {

      await deleteNote(
        noteId
      );

      setNotes(
        (prev) =>
          prev.filter(
            (note) =>
              note._id !==
              noteId
          )
      );

      toast.success(
        "Note deleted"
      );

    } catch (error) {

      toast.error(
        "Failed to delete note"
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
  id: memberId,
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

const memberIds =
  classroom.members.map(
    (member) =>
      member._id.toString()
  );

Object.keys(
  progressData
).forEach(
  (memberId) => {

    if (
      !memberIds.includes(
        memberId
      )
    ) {

      delete progressData[
        memberId
      ];

    }

  }
);


const leaderboard =
  Object.values(
    progressData
  )
    .filter(
      (member) =>
        memberIds.includes(
          member.id
        )
    )
    .sort(
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

    setUploadingNote(
      true
    );

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

      const data =
        await uploadNote(
          id,
          formData
        );

      setUploadingNote(
        false
      );

      toast.success(
        "Note uploaded"
      );

      setNoteTitle("");

      setSelectedFile(
        null
      );

      setNotes(
        (prev) => [
          data.note,
          ...prev,
        ]
      );

    } catch (error) {

      setUploadingNote(
        false
      );

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

  const handleDeleteClassroom =
  async () => {

    const confirmDelete =
      window.confirm(
        "Delete this classroom?"
      );

    if (!confirmDelete)
      return;

    try {

      await deleteClassroom(id);

      toast.success(
        "Classroom deleted"
      );

      navigate(
        "/Classroom"
      );

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Failed"
      );

    }
};

const handleLeaveClassroom =
  async () => {

    const confirmLeave =
      window.confirm(
        "Leave this classroom?"
      );

    if (!confirmLeave)
      return;

    try {

      await leaveClassroom(id);

      toast.success(
        "Left classroom"
      );

      navigate("/classroom");

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to leave classroom"
      );

    }
};


return (
    <DashboardLayout>

  <div className="space-y-6">

    {/* ================= Header ================= */}

    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">

  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">

    <div className="flex-1">

      <h1 className="text-3xl font-bold text-slate-900">
        {classroom.name}
      </h1>

      <p className="mt-3 text-slate-500 leading-relaxed">
        {classroom.description}
      </p>

      <div className="flex flex-wrap gap-3 mt-6">

        <div className="bg-violet-50 text-violet-700 px-4 py-2 rounded-xl font-medium">
          🔑 {classroom.roomCode}
        </div>

        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium">
          👥 {classroom.members.length} Members
        </div>

        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-medium">
          ✅ {tasks.length} Tasks
        </div>

        <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-xl font-medium">
          📚 {notes.length} Resources
        </div>

      </div>

    </div>

    <div className="flex gap-3">

      {isCreator ? (

        <button
          onClick={handleDeleteClassroom}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-all duration-300"
        >
          Delete Classroom
        </button>

      ) : (

        <button
          onClick={handleLeaveClassroom}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl transition-all duration-300"
        >
          Leave Classroom
        </button>

      )}

    </div>

  </div>

</div>

    {/* ============ Tasks + Chat ============ */}

    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

      <div className="xl:col-span-8">

  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

    <div className="flex items-center justify-between mb-6">

      <div>

        <h2 className="text-2xl font-bold text-slate-900">
          Classroom Tasks
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage assignments and track completion.
        </p>

      </div>

      <div className="bg-violet-100 text-violet-700 px-4 py-2 rounded-xl font-semibold">

        {tasks.length} Tasks

      </div>

    </div>

    {isCreator && (

      <form
        onSubmit={handleCreateTask}
        className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 space-y-4"
      >

        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              title: e.target.value,
            })
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-400"
          required
        />

        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              description: e.target.value,
            })
          }
          rows={4}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-violet-400"
        />

        <button
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl transition-all duration-300"
        >
          Add Classroom Task
        </button>

      </form>

    )}

    <div className="space-y-4">

      {tasks.length === 0 ? (

        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl">

          <div className="text-5xl mb-4">
            📋
          </div>

          <h3 className="text-xl font-semibold text-slate-800">
            No Tasks Yet
          </h3>

          <p className="text-slate-500 mt-2">
            Create your first classroom task.
          </p>

        </div>

      ) : (

        tasks.map((task) => (

          <ClassroomTaskCard
            key={task._id}
            task={task}
            onComplete={handleCompleteTask}
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

      <div className="xl:col-span-4">

 <div className="sticky top-6">

  <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden h-[760px] flex flex-col">

    {/* Header */}

    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">

      <div>

        <h2 className="text-xl font-bold text-slate-900">
          Classroom Chat
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Discuss tasks and collaborate with your classmates.
        </p>

      </div>

      <div className="flex items-center gap-2">

        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>

        <span className="text-sm text-slate-600">
          Live
        </span>

      </div>

    </div>

    {/* Chat */}

    <div className="flex-1 bg-slate-50 overflow-hidden">

      <ClassroomChat
        classroomId={id}
      />

    </div>

  </div>

</div>

</div>

    </div>

    {/* ============ Members + Notes ============ */}

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

    <button
  onClick={() => setShowMembers(!showMembers)}
  className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition"
>
  <div>
    <h2 className="text-2xl font-bold text-slate-900">
      Members
    </h2>

    <p className="text-sm text-slate-500 mt-1">
      {classroom.members.length} members in this classroom
    </p>
  </div>

  <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-violet-100 transition">
    {showMembers ? (
      <ChevronUp size={22} />
    ) : (
      <ChevronDown size={22} />
    )}
  </div>
</button>

    {showMembers && (

        <div className="border-t border-slate-100 p-6">

            <div className="space-y-3">

                {classroom.members.map((member) => (

                    <div
                        key={member._id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition"
                    >

                        <div>

                            <p className="font-semibold text-slate-800">
                                {member.name}
                            </p>

                            <p className="text-sm text-slate-500">
                                {member.email}
                            </p>

                        </div>

                        <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center font-bold text-violet-700">

                            {member.name?.charAt(0)}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    )}

</div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

   <button
  onClick={() => setShowNotes(!showNotes)}
  className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition"
>
  <div>
    <h2 className="text-2xl font-bold text-slate-900">
      Notes & Resources
    </h2>

    <p className="text-sm text-slate-500 mt-1">
      {notes.length} shared resources
    </p>
  </div>

  <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-violet-100 transition">
    {showNotes ? (
      <ChevronUp size={22} />
    ) : (
      <ChevronDown size={22} />
    )}
  </div>
</button>

    {showNotes && (

<div className="border-t border-slate-100 p-6 space-y-8">

  {/* Upload Note */}

  <form
    onSubmit={handleUploadNote}
    className="space-y-4"
  >

    <h3 className="text-lg font-semibold text-slate-800">
      Upload Note
    </h3>

    <input
      type="text"
      placeholder="Note Title"
      value={noteTitle}
      onChange={(e) =>
        setNoteTitle(e.target.value)
      }
      className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-violet-400 outline-none"
      required
    />

    <input
      type="file"
      onChange={(e) =>
        setSelectedFile(e.target.files[0])
      }
      className="w-full rounded-xl border border-slate-300 px-4 py-3"
      required
    />

    <button
      disabled={uploadingNote}
      className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl transition disabled:opacity-60"
    >
      {uploadingNote
        ? "Uploading..."
        : "Upload Note"}
    </button>

  </form>

  <hr className="border-slate-200" />

  {/* Share Link */}

  <form
    onSubmit={handleShareLink}
    className="space-y-4"
  >

    <h3 className="text-lg font-semibold text-slate-800">
      Share Resource Link
    </h3>

    <input
      type="text"
      placeholder="Link Title"
      value={linkTitle}
      onChange={(e) =>
        setLinkTitle(e.target.value)
      }
      className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-violet-400 outline-none"
      required
    />

    <input
      type="url"
      placeholder="https://..."
      value={linkUrl}
      onChange={(e) =>
        setLinkUrl(e.target.value)
      }
      className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-violet-400 outline-none"
      required
    />

    <button
      className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl transition"
    >
      Share Link
    </button>

  </form>

  <hr className="border-slate-200" />

  {/* Shared Notes */}

  <div>

    <h3 className="text-lg font-semibold text-slate-800 mb-4">
      Shared Resources
    </h3>

    <div className="space-y-4">

      {notes.length === 0 ? (

        <div className="text-center py-8 text-slate-500 border border-dashed rounded-xl">
          No notes shared yet.
        </div>

      ) : (

        notes.map((note) => (

          <ClassroomNoteCard
            key={note._id}
            note={note}
            onDelete={handleDeleteNote}
          />

        ))

      )}

    </div>

  </div>

</div>

)}
</div>

    </div>

    {/* ============ Progress + Leaderboard ============ */}

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

     <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

    <div className="flex items-center justify-between mb-6">

        <div>

            <h2 className="text-xl font-bold text-slate-900">
                Progress Tracking
            </h2>

            <p className="text-sm text-slate-500 mt-1">
                Classroom completion status
            </p>

        </div>

    </div>

    <div className="space-y-5">

        {classroom.members.map((member) => {

            const memberProgress =
                progressData[member._id];

            const completed =
                memberProgress?.completed || 0;

            const percentage =
                tasks.length === 0
                    ? 0
                    : Math.round(
                          (completed / tasks.length) * 100
                      );

            return (

                <div
                    key={member._id}
                    className="space-y-2"
                >

                    <div className="flex justify-between">

                        <span className="font-medium text-slate-700">
                            {member.name}
                        </span>

                        <span className="text-violet-600 font-semibold">

                            {completed}/{tasks.length}

                        </span>

                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200">

                        <div

                            style={{
                                width: `${percentage}%`,
                            }}

                            className="h-2 rounded-full bg-violet-600"

                        />

                    </div>

                </div>

            );

        })}

    </div>

</div>
      
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

    <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-900">
            Leaderboard
        </h2>

        <p className="text-sm text-slate-500 mt-1">
            Top performers in this classroom
        </p>

    </div>

    <div className="space-y-4">

        {leaderboard.length === 0 ? (

            <div className="text-center py-12 text-slate-500">

                No progress yet.

            </div>

        ) : (

            leaderboard.map((member, index) => (

                <div
                    key={member.name}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
                >

                    <div className="flex items-center gap-4">

                        <div
                            className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold

                            ${
                                index === 0
                                    ? "bg-yellow-500"
                                    : index === 1
                                    ? "bg-slate-400"
                                    : index === 2
                                    ? "bg-orange-500"
                                    : "bg-violet-600"
                            }`}
                        >

                            {index + 1}

                        </div>

                        <div>

                            <p className="font-semibold text-slate-800">
                                {member.name}
                            </p>

                            <p className="text-sm text-slate-500">
                                {member.completed} Tasks Completed
                            </p>

                        </div>

                    </div>

                    <div className="font-bold text-violet-700">

                        {member.completed}

                    </div>

                </div>

            ))

        )}

    </div>

</div>

    </div>

  </div>

</DashboardLayout>
  );
};

export default ClassroomDetails;