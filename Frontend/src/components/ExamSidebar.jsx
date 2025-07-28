import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ExamSidebar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const exams = ["React", "JavaScript", "HTML", "CSS"];
  const activeRoute = location.pathname;

  if (!isAuthenticated) return null;

  return (
    <aside className="w-64 mt-20 rounded-lg h-screen bg-[rgb(214,228,239)] p-6 shadow-lg fixed top-1 left-0 z-50 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold text-blue-700 mb-8">Exam!!</h1>

        <Link
          to="/"
          className={`block px-4 py-2 rounded-md text-lg mb-2 ${
            activeRoute === "/"
              ? "bg-blue-400 text-white"
              : "bg-blue-200 text-gray-800 hover:bg-blue-300"
          }`}
        >
          Home
        </Link>

        {exams.map((exam) => (
          <Link
            key={exam}
            to={`/dashboard/${exam.toLowerCase()}`}
            className={`block px-4 py-2 rounded-md text-lg mb-2 ${
              activeRoute === `/dashboard/${exam.toLowerCase()}`
                ? "bg-blue-400 text-white"
                : "bg-blue-200 text-gray-800 hover:bg-blue-300"
            }`}
          >
            {exam}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default ExamSidebar;
