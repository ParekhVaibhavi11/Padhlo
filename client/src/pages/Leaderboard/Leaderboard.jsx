import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getLeaderboard,
} from "../../services/leaderboardService";

const Leaderboard = () => {

  const [users,
    setUsers] =
    useState([]);

  const loadLeaderboard =
    async () => {

      try {

        const data =
          await getLeaderboard();

        setUsers(
          data.users
        );

      } catch {

        toast.error(
          "Failed to load leaderboard"
        );

      }
    };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
  <DashboardLayout>
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            🏆 Leaderboard
          </h1>

          <p className="mt-2 text-slate-500">
            Compete with classmates and maintain your learning streak.
          </p>

        </div>

      </div>

      {/* Leaderboard Card */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-violet-600"></div>

        <div className="p-6">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Rankings
              </h2>

              <p className="text-slate-500 mt-1">
                Students ranked by highest streak.
              </p>

            </div>

            <div className="rounded-2xl bg-violet-100 px-4 py-2">

              <span className="font-semibold text-violet-700">
                {users.length} Students
              </span>

            </div>

          </div>

          <div className="space-y-4">

            {users.map((user, index) => (

              <div
                key={user._id}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
              >

                <div className="flex items-center gap-5">

                  {/* Rank */}

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold text-lg
                    ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : index === 1
                        ? "bg-gray-200 text-gray-700"
                        : index === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-violet-100 text-violet-700"
                    }`}
                  >

                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : `${index + 1}`}

                  </div>

                  {/* Avatar */}

                  {user.avatar ? (

                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="h-14 w-14 rounded-full object-cover border-2 border-violet-100"
                    />

                  ) : (

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-xl font-bold text-white">

                      {user.name?.charAt(0).toUpperCase()}

                    </div>

                  )}

                  {/* User */}

                  <div>

                    <h3 className="text-lg font-semibold text-slate-900">

                      {user.name}

                    </h3>

                    <p className="text-sm text-slate-500">

                      Keep learning every day 🚀

                    </p>

                  </div>

                </div>

                {/* Streak */}

                <div className="text-right">

                  <p className="text-3xl font-bold text-violet-700">

                    {user.streak}

                  </p>

                  <p className="text-sm text-slate-500">

                    Day Streak

                  </p>

                </div>

              </div>

            ))}

            {users.length === 0 && (

              <div className="py-16 text-center">

                <div className="text-6xl mb-4">

                  🏆

                </div>

                <h3 className="text-xl font-semibold text-slate-700">

                  No Rankings Yet

                </h3>

                <p className="mt-2 text-slate-500">

                  Complete tasks to start climbing the leaderboard.

                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  </DashboardLayout>
);
};

export default Leaderboard;