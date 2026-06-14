import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/classrooms`;

const getToken = () =>
  localStorage.getItem("token");

export const getClassrooms =
  async () => {
    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const createClassroom =
  async (classroomData) => {
    const response =
      await axios.post(
        API_URL,
        classroomData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const joinClassroom =
  async (roomCode) => {
    const response =
      await axios.post(
        `${API_URL}/join`,
        { roomCode },
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

  export const getClassroomById =
  async (classroomId) => {
    const response =
      await axios.get(
        `${API_URL}/${classroomId}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };