import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/classrooms`;

const getToken = () =>
  localStorage.getItem("token");

export const getNotes =
  async (classroomId) => {
    const response =
      await axios.get(
        `${API_URL}/${classroomId}/notes`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const uploadNote =
  async (
    classroomId,
    formData
  ) => {
    const response =
      await axios.post(
        `${API_URL}/${classroomId}/notes/upload`,
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

export const shareNoteLink =
  async (
    classroomId,
    noteData
  ) => {
    const response =
      await axios.post(
        `${API_URL}/${classroomId}/notes/link`,
        noteData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

  export const deleteNote =
  async (noteId) => {

    const response =
      await axios.delete(
        `${API_URL}/notes/${noteId}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;

};