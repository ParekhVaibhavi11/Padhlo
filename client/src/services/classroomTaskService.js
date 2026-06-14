import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/classrooms`;

const getToken = () =>
  localStorage.getItem("token");

export const getClassroomTasks =
  async (classroomId) => {
    const response =
      await axios.get(
        `${API_URL}/${classroomId}/tasks`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const createClassroomTask =
  async (
    classroomId,
    taskData
  ) => {
    const response =
      await axios.post(
        `${API_URL}/${classroomId}/tasks`,
        taskData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const completeClassroomTask =
  async (taskId) => {
    const response =
      await axios.put(
        `${API_URL}/tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };