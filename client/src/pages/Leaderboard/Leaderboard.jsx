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

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

        <h1 className="text-3xl font-bold mb-6">
          Leaderboard
        </h1>

        <div className="space-y-4">

          {users.map(
            (
              user,
              index
            ) => (

              <div
                key={user._id}
                className="flex items-center justify-between border rounded-xl p-4"
              >

                <div className="flex items-center gap-4">

                  <div className="font-bold text-lg w-8">

                    #{index + 1}

                  </div>

                  {user.avatar ? (
                    <img
                      src={
                        user.avatar
                      }
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center font-bold">

                      {user.name?.charAt(
                        0
                      )}

                    </div>
                  )}

                  <div>

                    <p className="font-semibold">

                      {user.name}

                    </p>

                  </div>

                </div>

                <div className="text-purple-700 font-semibold">

                  {user.streak}
                  {" "}
                  Days

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Leaderboard;