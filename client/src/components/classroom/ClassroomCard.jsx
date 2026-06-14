import { useNavigate } from "react-router-dom";
const ClassroomCard = ({
  classroom,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-lg font-semibold text-gray-900">
            {classroom.name}
          </h3>

          <p className="text-gray-500 mt-1">
            {classroom.description}
          </p>

        </div>

        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
          {classroom.members?.length || 0}
          {" "}
          Members
        </span>

      </div>
      

      <div className="mt-4 pt-4 border-t border-gray-100">

        <p className="text-sm text-gray-500">
          Room Code
        </p>

        <p className="font-semibold text-purple-700 tracking-wider">
          {classroom.roomCode}
        </p>

      </div>

      <button
        onClick={() =>
          navigate(
            `/classroom/${classroom._id}`
          )
        }
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Open Classroom
      </button>

    </div>
  );
};

export default ClassroomCard;