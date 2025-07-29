import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ExamSidebar from "../components/ExamSidebar";

function Layout() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex min-h-screen">
        <ExamSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main
          className={`flex-1 transition-all duration-300 ${
            isOpen ? "ml-70" : "ml-20"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
