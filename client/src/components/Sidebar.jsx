import { NavLink } from "react-router-dom";

import {
  HiHome,
  HiClipboardList,
  HiUser,
  HiCalendar,
  HiAcademicCap,
  HiCollection,
} from "react-icons/hi";

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HiHome />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <HiClipboardList />,
    },
    {
      name: "Classroom",
      path: "/classroom",
      icon: <HiCollection />,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: <HiCalendar />,
    },
    {
      name: "Materials",
      path: "/materials",
      icon: <HiAcademicCap />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <HiUser />,
    },
  ];

  return (
    <aside
      className={`
      bg-white border-r border-gray-200 min-h-screen transition-all duration-300
      ${isOpen ? "w-64" : "w-0 overflow-hidden"}
    `}
    >
      <div className="p-6 border-b border-gray-200">

        <h1 className="text-2xl font-bold text-purple-700">
          Padhlo
        </h1>

      </div>

      <nav className="p-4">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                isActive
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

      </nav>
    </aside>
  );
};

export default Sidebar;