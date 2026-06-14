import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/tasks`;

const getToken = () =>
  localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization:
      `Bearer ${getToken()}`,
  },
});

export const getTasks =
  async () => {
    const response =
      await axios.get(
        API_URL,
        config()
      );

    return response.data;
  };

export const createTask =
  async (taskData) => {
    const response =
      await axios.post(
        API_URL,
        taskData,
        config()
      );

    return response.data;
  };

export const completeTask =
  async (taskId) => {
    const response =
      await axios.put(
        `${API_URL}/${taskId}`,
        {},
        config()
      );

    return response.data;
  };

export const deleteTask =
  async (taskId) => {
    const response =
      await axios.delete(
        `${API_URL}/${taskId}`,
        config()
      );

    return response.data;
  };