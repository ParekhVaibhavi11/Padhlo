import DashboardLayout from "../../layouts/DashboardLayout";
import useAuthStore from "../../store/authStore";

import StatCard from "../../components/dashboard/StatCard";

import { useEffect, useState } from "react";

import { getDashboardStats }
from "../../services/dashboardServices";



const Dashboard = () => {
  const user = useAuthStore(
    (state) => state.user
  );
  console.log(user);

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
  const loadStats =
    async () => {
      try {

        const data =
          await getDashboardStats();

        setStats(data);

      } catch (error) {

        console.log(error);

      }
    };

  loadStats();
}, []);


  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your study goals and track your progress.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatCard
            title="Tasks"
            value={stats.totalTasks}
          />

          <StatCard
            title="Completed"
            value={stats.completedTasks}
            />

          <StatCard
            title="Pending"
            value={stats.pendingTasks}
            />

          <StatCard
            title="Streak"
            value={user?.streak ? `${user.streak} Days` : "0 Days"}
          />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <h2 className="text-lg font-semibold">
              Recent Activity
            </h2>

            <p className="text-gray-500 mt-4">
              No recent activity available.
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <h2 className="text-lg font-semibold">
              Upcoming Tasks
            </h2>

            <p className="text-gray-500 mt-4">
              No upcoming tasks.
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;