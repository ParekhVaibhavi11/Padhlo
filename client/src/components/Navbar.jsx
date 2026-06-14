import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = () => {
  logout();

  sessionStorage.clear();

  navigate("/login", {
    replace: true,
  });
};
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-700"
        >
          <HiMenu />
        </button>

        <h2 className="text-xl font-semibold text-gray-800">
          Padhlo
        </h2>

      </div>

      <div className="flex items-center gap-4">

        <span className="font-medium text-gray-700">
          {user?.name}
        </span>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default Navbar;