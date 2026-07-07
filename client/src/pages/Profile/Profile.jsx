import {
  useEffect,
  useState,
} from "react";

import {
Phone,
School,
User,
Target,
Sparkles,
NotebookPen,
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../../services/profileService";

const Profile = () => {

  const icons = {
phone: <Phone size={18}/>,
college: <School size={18}/>,
bio: <NotebookPen size={18}/>,
skills: <Sparkles size={18}/>,
shortGoal: <Target size={18}/>,
longGoal: <Target size={18}/>,
};

  const [user,
    setUser] =
    useState(null);

  const [isEditing,
    setIsEditing] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      phone: "",
      college: "",
      bio: "",
      skills: "",
      shortGoal: "",
      longGoal: "",
    });

  const loadProfile =
    async () => {
      try {

        const data =
          await getProfile();

        setUser(
          data.user
        );

        setFormData({
          phone:
            data.user.phone || "",

          college:
            data.user.college || "",

          bio:
            data.user.bio || "",

          skills:
            data.user.skills || "",

          shortGoal:
            data.user.shortGoal || "",

          longGoal:
            data.user.longGoal || "",
        });

      } catch {

        toast.error(
          "Failed to load profile"
        );

      }
    };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSave =
    async () => {
      try {

        await updateProfile(
          formData
        );

        toast.success(
          "Profile Updated"
        );

        setIsEditing(
          false
        );

        loadProfile();

      } catch {

        toast.error(
          "Update Failed"
        );

      }
    };

  const handleAvatar =
    async (e) => {

      try {

        const formData =
          new FormData();

        formData.append(
          "avatar",
          e.target.files[0]
        );

        await uploadAvatar(
          formData
        );

        toast.success(
          "Photo Updated"
        );

        loadProfile();

      } catch {

        toast.error(
          "Upload Failed"
        );

      }
    };

  if (!user) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

 return (
  <DashboardLayout>

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          👤 My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your personal information, goals and profile picture.
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* LEFT CARD */}

        <div className="xl:col-span-4">

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">

            <div className="h-2 bg-gradient-to-r from-violet-600 to-purple-600"></div>

            <div className="p-8 flex flex-col items-center">

              {user.avatar ? (

                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-44 h-44 rounded-full object-cover border-4 border-violet-100 shadow-lg"
                />

              ) : (

                <div className="w-44 h-44 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-6xl font-bold text-white shadow-lg">

                  {user.name?.charAt(0).toUpperCase()}

                </div>

              )}
              <div className="grid grid-cols-3 gap-3 w-full mt-8">

  <div className="rounded-2xl bg-violet-50 py-4 text-center">

    <p className="text-2xl font-bold text-violet-700">
      {user.streak || 0}
    </p>

    <p className="text-xs text-slate-500">
      Streak
    </p>

  </div>

  <div className="rounded-2xl bg-blue-50 py-4 text-center">

    <p className="text-2xl font-bold text-blue-700">
      {user.totalTasks || 0}
    </p>

    <p className="text-xs text-slate-500">
      Tasks
    </p>

  </div>

  <div className="rounded-2xl bg-green-50 py-4 text-center">

    <p className="text-2xl font-bold text-green-700">
      {user.completedTasks || 0}
    </p>

    <p className="text-xs text-slate-500">
      Done
    </p>

  </div>

</div>

              <h2 className="text-2xl font-bold mt-6">

                {user.name}

              </h2>

              <p className="text-slate-500 mt-2">

                {user.email}

              </p>

              <label className="mt-8 w-full cursor-pointer rounded-xl bg-violet-600 py-3 text-center font-semibold text-white transition hover:bg-violet-700 hover:shadow-lg">

                Change Profile Picture

                <input
                  type="file"
                  className="hidden"
                  onChange={handleAvatar}
                />

              </label>

            </div>

          </div>

        </div>

        {/* RIGHT CARD */}

        <div className="xl:col-span-8">

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">

            <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">

              <div>

                <h2 className="text-2xl font-bold text-slate-900">

                  Profile Information

                </h2>

                <p className="text-slate-500 mt-1">

                  Keep your profile updated.

                </p>

              </div>

              {isEditing ? (

                <div className="flex gap-3">

                  <button
                    onClick={handleSave}
                    className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setIsEditing(false);
                      loadProfile();
                    }}
                    className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>

                </div>

              ) : (

                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                >
                  Edit Profile
                </button>
              )}

            </div>

            <div className="grid md:grid-cols-2 gap-6 p-8">

              {[
                ["Phone", "phone"],
                ["College", "college"],
                ["Bio", "bio"],
                ["Skills", "skills"],
                ["Short Goal", "shortGoal"],
                ["Long Goal", "longGoal"],
              ].map(([label, key]) => (

                <div
                  key={key}
                  className={
                    key === "bio" || key === "longGoal"
                      ? "md:col-span-2"
                      : ""
                  }
                >

                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">

                  {icons[key]}

                  {label}

                  </label>

                  {isEditing ? (

                    <textarea
                      rows="2"
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [key]: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />

                  ) : (

                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">

                      {formData[key] || "Not added"}

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  </DashboardLayout>
);
};

export default Profile;