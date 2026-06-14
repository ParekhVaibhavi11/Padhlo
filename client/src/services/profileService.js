import axios from "axios";

const API_URL =
  "http://localhost:5000/api/profile";

const getToken = () =>
  localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization:
      `Bearer ${getToken()}`,
  },
});

export const getProfile =
  async () => {
    const response =
      await axios.get(
        API_URL,
        config()
      );

    return response.data;
  };

export const updateProfile =
  async (profileData) => {
    const response =
      await axios.put(
        API_URL,
        profileData,
        config()
      );

    return response.data;
  };

export const uploadAvatar =
  async (formData) => {
    const response =
      await axios.post(
        `${API_URL}/avatar`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };