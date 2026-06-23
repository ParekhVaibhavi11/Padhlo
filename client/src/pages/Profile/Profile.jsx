import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../../services/profileService";

const Profile = () => {

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

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Left Side */}

          <div className="border-r pr-6 flex items-center justify-center">

  <div className="flex flex-col items-center">

              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-52 h-52 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                />
              ) : (
                <div className="w-52 h-52 rounded-full bg-purple-100 flex items-center justify-center text-6xl font-bold text-purple-700">

                  {user.name?.charAt(0)}

                </div>
              )}

              <h2 className="text-2xl font-bold mt-5">
                {user.name}
              </h2>

             <p className="text-gray-500 mt-1">
                {user.email}
              </p>

              <label className="mt-4 cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg">

                Change Photo

                <input
                  type="file"
                  className="hidden"
                  onChange={
                    handleAvatar
                  }
                />

              </label>

            </div>

          </div>

          {/* Right Side */}

          <div className="md:col-span-2">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-semibold">
                Profile Details
              </h2>

              {!isEditing ? (
                <button
                  onClick={() =>
                    setIsEditing(
                      true
                    )
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">

                  <button
                    onClick={
                      handleSave
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => {
                      setIsEditing(
                        false
                      );

                      loadProfile();
                    }}
                    className="border px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>

                </div>
              )}

            </div>

            <div className="grid gap-4">

              {[
                ["Phone", "phone"],
                ["College", "college"],
                ["Bio", "bio"],
                ["Skills", "skills"],
                ["Short Goal", "shortGoal"],
                ["Long Goal", "longGoal"],
              ].map(
                ([label, key]) => (
                  <div
                    key={key}
                  >

                    <label className="block text-sm font-medium mb-1">

                      {label}

                    </label>

                    {isEditing ? (
                      <textarea
                        value={
                          formData[
                            key
                          ]
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [key]:
                              e.target
                                .value,
                          })
                        }
                        className="w-full border rounded-lg p-3"
                        rows="2"
                      />
                    ) : (
                      <div className="border rounded-lg p-3 bg-gray-50">

                        {formData[
                          key
                        ] ||
                          "Not added"}

                      </div>
                    )}

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Profile;