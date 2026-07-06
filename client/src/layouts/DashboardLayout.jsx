import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar isOpen={isOpen} />

      <div className="flex flex-1 flex-col">

        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;