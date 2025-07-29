import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { FaJsSquare, FaHtml5, FaCss3 } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaReact } from "react-icons/fa";

const ExamSidebar = ({ isOpen, setIsOpen }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const exams = [
    { name: "React", icon: <FaReact />, path: "react" },
    { name: "JavaScript", icon: <FaJsSquare />, path: "javascript" },
    { name: "HTML", icon: <FaHtml5 />, path: "html" },
    { name: "CSS", icon: <FaCss3 />, path: "css" },
  ];
  const activeRoute = location.pathname;



  return (
    <>{isAuthenticated && (
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-[rgb(214,228,239)] shadow-lg p-6 transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-16"
          }`}
      >
        {isOpen ? (
          <div className="mt-20 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-3xl font-bold text-blue-700 mb-8">Exam!!</h1>
              <Link
                to="/"
                className={`block px-4 py-3 rounded-md text-lg mb-2 ${activeRoute === "/"
                  ? "bg-blue-400 text-white"
                  : "bg-blue-200 text-gray-800 hover:bg-blue-300"
                  }`}
              >
                <p className="flex items-center gap-5 "><IoHomeSharp />Home</p>
              </Link>

              {exams.map(({ name, icon, path }) => (
                <Link
                  key={name}
                  to={`/dashboard/${path}`}
                  className={`block px-4 py-3 rounded-md text-lg mb-2 ${activeRoute === `/dashboard/${path}`
                    ? "bg-blue-400 text-white"
                    : "bg-blue-200 text-gray-800 hover:bg-blue-300"
                    }`}
                >
                  <p className="flex items-center gap-5">{icon} {name}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-20 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-3xl mt-19 font-bold text-blue-700 mb-8"> </h1>
              <Link
                to="/"
                className={`block ml-[-16px] px-6 py-3 justify-items-center rounded-md text-lg mb-2 ${activeRoute === "/"
                  ? "bg-blue-400 text-white"
                  : "bg-blue-200 text-gray-800 hover:bg-blue-300"
                  }`}
              >
                <p className="group relative flex justify-center"><IoHomeSharp />
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50  ">
                    Home
                  </span>
                </p>
              </Link>

              {exams.map(({ name, icon, path }) => (
                <Link
                  key={name}
                  to={`/dashboard/${path}`}
                  className={`block ml-[-16px] justify-items-center px-6 py-3 rounded-md text-lg mb-2 ${activeRoute === `/dashboard/${path}`
                    ? "bg-blue-400 text-white"
                    : "bg-blue-200 text-gray-800 hover:bg-blue-300"
                    }`}
                >
                  <p className="group relative flex justify-center">{icon}
                    <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50  ">
                      {name}
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>
    )}
      {isAuthenticated && (<button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ml-2 cursor-pointer top-6 ${isOpen ? "left-50" : "left-0"} z-50 bg-blue-500 text-white p-2 rounded-r transition-all duration-300`}
      >
        {isOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
      </button>)}
    </>
  );
};

export default ExamSidebar;
