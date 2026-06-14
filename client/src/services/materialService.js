import axios from "axios";

const API_URL =
  "http://localhost:5000/api/materials";

const getToken = () =>
  localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization:
      `Bearer ${getToken()}`,
  },
});

export const getMaterials =
  async () => {
    const response =
      await axios.get(
        API_URL,
        config()
      );

    return response.data;
  };

export const uploadMaterial =
  async (formData) => {
    const response =
      await axios.post(
        API_URL,
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

export const deleteMaterial =
  async (id) => {
    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        config()
      );

    return response.data;
  };