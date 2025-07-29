import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserLarge } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const Navbar = ({ isOpen }) => {
  const { user, setUser, setIsAuthenticated } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const hiddenPaths = ["/exam/react"];

  // if (hiddenPaths.includes(location.pathname)) {
  //   return null; // Hide Navbar for specific paths
  // }
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {

      await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUser(null);
      setIsAuthenticated(false);

      toast.success("Logged out successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setDropdownOpen(false);
    }
  };

  const handleUpdateProfile = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  const handleChangePassword = () => {
    setDropdownOpen(false);
    navigate("/profile", { state: { changePassword: true } });
  };


  return (
    <header className="sticky top-0 z-50 p-2 bg-[rgb(214,228,239)] text-gray-800 w-full shadow-xl rounded-xl">
      <div className="container flex justify-between h-16 mx-auto items-center">
        <Link to="/" className={`text-3xl font-bold ${isOpen ? "ml-64" : "ml-17"} transition-all duration-300`}>
          SkillStack
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 roundzed-full bg-gray-300 cursor-pointer flex items-center justify-center hover:bg-gray-400 focus:outline-none"
            >
              <span className="text-xl "><FaUserLarge /></span>
            </button>
            <div className="text-sm font-bold">
              <span className="text-gray-800">{user.firstName} {user.lastName}</span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                <button
                  onClick={handleUpdateProfile}
                  className="block cursor-pointer w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleChangePassword}
                  className="block cursor-pointer w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="block cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="px-6 py-2 cursor-pointer rounded border border-blue-600 text-blue-600 hover:bg-blue-50">
                Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-6 py-2 cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
