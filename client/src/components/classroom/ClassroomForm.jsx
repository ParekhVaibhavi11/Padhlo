import { useState } from "react";
import { Plus, Users } from "lucide-react";

const ClassroomForm = ({ onCreate, onJoin }) => {

  const [createData, setCreateData] = useState({
    name: "",
    description: "",
  });

  const [roomCode, setRoomCode] = useState("");

  return (

    <div className="grid lg:grid-cols-2 gap-6">

      {/* Create Classroom */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden">

        <div className="h-2 bg-gradient-to-r from-violet-600 to-purple-500"></div>

        <div className="p-7">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">

              <Plus size={28} className="text-violet-600" />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Create Classroom
              </h2>

              <p className="text-slate-500 text-sm">
                Start a new classroom for your students.
              </p>

            </div>

          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              onCreate(createData);

              setCreateData({
                name: "",
                description: "",
              });
            }}
            className="space-y-5"
          >

            <input
              type="text"
              placeholder="Classroom Name"
              value={createData.name}
              onChange={(e) =>
                setCreateData({
                  ...createData,
                  name: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
              required
            />

            <textarea
              placeholder="Classroom Description"
              rows={4}
              value={createData.description}
              onChange={(e) =>
                setCreateData({
                  ...createData,
                  description: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 resize-none focus:ring-2 focus:ring-violet-500 outline-none"
            />

            <button
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-300/40 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Create Classroom
            </button>

          </form>

        </div>

      </div>

      {/* Join Classroom */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden">

        <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

        <div className="p-7">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

              <Users size={28} className="text-blue-600" />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Join Classroom
              </h2>

              <p className="text-slate-500 text-sm">
                Enter a room code shared by your instructor.
              </p>

            </div>

          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              onJoin(roomCode);

              setRoomCode("");
            }}
            className="space-y-5"
          >

            <input
              type="text"
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) =>
                setRoomCode(e.target.value)
              }
              className="w-full rounded-2xl border border-slate-300 px-5 py-3 tracking-widest uppercase focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <button
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-300/40 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Join Classroom
            </button>

          </form>

        </div>

      </div>

    </div>

  );
};

export default ClassroomForm;