import axios from "axios";

const API_URL =
  "http://localhost:5000/api/leaderboard";

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