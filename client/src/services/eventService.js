import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/events`;

const getToken = () =>
  localStorage.getItem("token");

export const getEvents =
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

export const createEvent =
  async (eventData) => {
    const response =
      await axios.post(
        API_URL,
        eventData,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };

export const deleteEvent =
  async (id) => {
    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`,
          },
        }
      );

    return response.data;
  };