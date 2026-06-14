import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] =
    useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">

      <Sidebar isOpen={isOpen} />

      <div className="flex-1">

        <Navbar
          toggleSidebar={toggleSidebar}
        />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;