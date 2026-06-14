import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/leaderboard`;

const getToken = () =>
  localStorage.getItem("token");

export const getLeaderboard =
  async () => {

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
};