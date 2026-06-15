import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/classrooms`;

const getToken = () =>
  localStorage.getItem("token");

export const getMessages =
  async (classroomId) => {

    const response =
      await axios.get(
        `${API_URL}/${classroomId}/chat`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
};

export const saveMessage =
  async (
    classroomId,
    message
  ) => {

    const response =
      await axios.post(
        `${API_URL}/${classroomId}/chat`,
        { message },
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
};

export const deleteMessage =
  async (messageId) => {

    const response =
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/classrooms/chat/message/${messageId}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
};

export const editMessage =
  async (
    messageId,
    message
  ) => {

    const response =
      await axios.put(
        `${import.meta.env.VITE_API_URL}/classrooms/chat/message/${messageId}`,
        { message },
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
};