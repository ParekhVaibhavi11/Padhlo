import { useEffect } from "react";

import useAuthStore from "../store/authStore";

import {
  getCurrentUser,
} from "../services/authService";

const useAuthLoader = () => {
  const token = useAuthStore(
    (state) => state.token
  );

  const setUser = useAuthStore(
    (state) => state.setUser
  );

  useEffect(() => {
    const loadUser = async () => {
      try {

        if (!token) return;

        const data =
          await getCurrentUser(token);

        setUser(data.user);

      } catch (error) {

        console.log(error);

      }
    };

    loadUser();

  }, [token, setUser]);
};

export default useAuthLoader;