import { useNavigate } from "react-router-dom";

const ClassroomCard = ({ classroom }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Top Accent */}
      <div className="h-2 bg-gradient-to-r from-violet-600 to-purple-500"></div>

      <div className="p-6">

        {/* Header */}

        <div className="flex justify-between items-start">

          <div className="flex-1">

            <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 transition">
              {classroom.name}
            </h3>

            <p className="text-slate-500 mt-2 line-clamp-2">
              {classroom.description}
            </p>

          </div>

          <div className="ml-4 bg-violet-100 text-violet-700 px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap">

            👥 {classroom.members?.length || 0}

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-slate-200 my-6"></div>

        {/* Room Code */}

        <div className="flex justify-between items-center">

          <div>

            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Room Code
            </p>

            <p className="mt-1 text-lg font-bold tracking-[0.2em] text-violet-700">
              {classroom.roomCode}
            </p>

          </div>

          <div className="bg-slate-100 rounded-xl px-3 py-2 text-sm text-slate-600">
            Active
          </div>

        </div>

        {/* Button */}

        <button
          onClick={() =>
            navigate(`/classroom/${classroom._id}`)
          }
          className="w-full mt-6 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-md"
        >
          Open Classroom →
        </button>

      </div>

    </div>
  );
};

export default ClassroomCard;