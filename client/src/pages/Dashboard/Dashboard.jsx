import useAuthStore from "../../store/authStore";

const Dashboard = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <div className="min-h-screen bg-purple-50 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-md p-8">

          <h1 className="text-4xl font-bold text-purple-700">
            Welcome Back,
            {" "}
            {user?.name || "Student"} 👋
          </h1>

          <p className="text-gray-600 mt-3">
            Ready to crush your study goals today?
          </p>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;