import { useState } from "react";

const ClassroomForm = ({
  onCreate,
  onJoin,
}) => {
  const [createData,
    setCreateData] =
    useState({
      name: "",
      description: "",
    });

  const [roomCode,
    setRoomCode] =
    useState("");

  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

        <h2 className="text-xl font-semibold mb-4">
          Create Classroom
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            onCreate(
              createData
            );

            setCreateData({
              name: "",
              description: "",
            });
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Classroom Name"
            value={
              createData.name
            }
            onChange={(e) =>
              setCreateData({
                ...createData,
                name:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            placeholder="Description"
            value={
              createData.description
            }
            onChange={(e) =>
              setCreateData({
                ...createData,
                description:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Create Room
          </button>

        </form>

      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

        <h2 className="text-xl font-semibold mb-4">
          Join Classroom
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            onJoin(
              roomCode
            );

            setRoomCode("");
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Room Code"
            value={roomCode}
            onChange={(e) =>
              setRoomCode(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Join Room
          </button>

        </form>

      </div>

    </div>
  );
};

export default ClassroomForm;