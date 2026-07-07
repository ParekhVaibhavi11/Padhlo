import { HiMenu } from "react-icons/hi";
import { Bell, Search, LogOut } from "lucide-react";
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

    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-8 h-20 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-5">

        <button
          onClick={toggleSidebar}
          className="w-11 h-11 rounded-xl hover:bg-violet-100 transition flex items-center justify-center"
        >

          <HiMenu
            size={24}
            className="text-slate-700"
          />

        </button>

        <h1 className="text-2xl font-bold text-slate-900">

          Padhlo

        </h1>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 w-72">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 w-full text-sm"
          />

        </div>

        {/* Notification */}

        <button
          className="relative w-11 h-11 rounded-full bg-slate-100 hover:bg-violet-100 transition flex items-center justify-center"
        >

          <Bell
            size={20}
            className="text-slate-700"
          />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">

            {user?.name?.charAt(0).toUpperCase()}

          </div>

          <div className="hidden md:block">

            <p className="font-semibold text-slate-900">
              {user?.name}
            </p>

            <p className="text-xs text-slate-500">
              Student
            </p>

          </div>

        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 h-11 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </header>

  );

};

export default Navbar;