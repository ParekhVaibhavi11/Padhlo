import { NavLink } from "react-router-dom";

import {
  HiHome,
  HiClipboardList,
  HiUser,
  HiCalendar,
  HiAcademicCap,
  HiCollection,
  HiStar,
} from "react-icons/hi";

const Sidebar = ({ isOpen }) => {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HiHome size={20} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <HiClipboardList size={20} />,
    },
    {
      name: "Classroom",
      path: "/classroom",
      icon: <HiCollection size={20} />,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: <HiCalendar size={20} />,
    },
    {
      name: "Materials",
      path: "/materials",
      icon: <HiAcademicCap size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <HiUser size={20} />,
    },
    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon: <HiStar size={20} />,
    },
  ];

  return (

    <aside
      className={`
      bg-white
      border-r
      border-slate-200
      shadow-sm
      transition-all
      duration-300
      flex
      flex-col
      min-h-screen

      ${isOpen ? "w-72" : "w-0 overflow-hidden"}
      `}
    >

      {/* Logo */}

      <div className="h-20 flex items-center px-8 border-b border-slate-200">

        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">

          P

        </div>

        <div className="ml-4">

          <h1 className="text-2xl font-bold text-slate-900">
            Padhlo
          </h1>

          <p className="text-xs text-slate-500">
            Learning Platform
          </p>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 px-5 py-6 space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 rounded-2xl px-5 py-3 font-medium transition-all duration-300

              ${
                isActive
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"
              }`
            }
          >

            <span className="text-xl">

              {item.icon}

            </span>

            <span>

              {item.name}

            </span>

          </NavLink>

        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-6">

        <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 p-5 text-white">

          <p className="font-semibold">

            Keep Learning 📚

          </p>

          <p className="text-sm mt-2 opacity-90">

            Every completed task brings you closer to your placement goal.

          </p>

        </div>

      </div>

    </aside>

  );

};

export default Sidebar;