import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar isOpen={isOpen} />

      {/* Main Area */}

      <div className="flex flex-1 flex-col min-w-0">

        {/* Navbar */}

        <Navbar
          toggleSidebar={toggleSidebar}
        />

        {/* Content */}

        <main className="flex-1 overflow-y-auto">

          <div className="mx-auto max-w-[1700px] px-6 py-6 lg:px-8 lg:py-8">

            {children}

          </div>

        </main>

      </div>

    </div>

  );

};

export default DashboardLayout;