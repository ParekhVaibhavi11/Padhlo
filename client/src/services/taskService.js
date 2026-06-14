import axios from "axios";

const API_URL =
  "http://localhost:5000/api/tasks";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getTasks = async () => {
  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const createTask = async (
  taskData
) => {
  const response = await axios.post(
    API_URL,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const completeTask = async (
  taskId
) => {
  const response = await axios.put(
    `${API_URL}/${taskId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const deleteTask = async (
  taskId
) => {
  const response = await axios.delete(
    `${API_URL}/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};