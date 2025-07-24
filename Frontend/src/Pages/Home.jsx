import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import Dashboard from "./Dashboard";

function Home() {
  const { setIsAuthenticated, user, setUser } = useAuth();
  const [click, setClick] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const exams = ["React", "JavaScript", "HTML", "CSS"];

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-blue-100 p-6 shadow-md mt-7">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Exams</h2>

        <button
          className={`text-lg cursor-pointer w-full text-left px-4 py-2 my-2 rounded-md ${
            click === ""
              ? "bg-blue-400 text-white"
              : "bg-blue-200 hover:bg-blue-300"
          }`}
          onClick={() => setClick("")}
        >
          Home
        </button>
        {exams.map((item) => (
          <button
            key={item}
            className={`text-lg cursor-pointer w-full text-left px-4 py-2 my-2 rounded-md ${
              click === item
                ? "bg-blue-400 text-white"
                : "bg-blue-200 hover:bg-blue-300"
            }`}
            onClick={() => setClick(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-10">
        {click ? (
          <Dashboard examType={click.toLowerCase()} />
        ) : (
          <>
            <div className="px-6 py-12 max-w-5xl mx-auto">
              <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
                {`Welcome to SkillStack! ${user?.firstName || "Guest"}`}
              </h1>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Our Mission
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur vel nisl a metus tincidunt suscipit. Integer non
                  magna sed libero congue gravida in sed metus. Aenean ac magna
                  vel lacus placerat tincidunt.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Why Choose Us?
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  ut lacinia augue. Sed at sapien at libero tristique facilisis.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Get Started
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  viverra, justo at malesuada pulvinar, velit ligula viverra
                  sapien, sit amet lacinia erat augue nec libero. Morbi eget
                  augue a metus volutpat feugiat.
                </p>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;