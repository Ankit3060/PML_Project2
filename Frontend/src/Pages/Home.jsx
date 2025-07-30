import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";

function Home() {
  const { setIsAuthenticated, user, setUser } = useAuth();

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
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUser();
  }, [setIsAuthenticated, setUser]);

  return (
    <div className="pt-10 pr-10 pl-10 sm:pl-4 sm:pr-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700 text-wrap break-words">
        {`Welcome to SkillStack! ${user?.firstName || "Guest"}`}
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
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
        <p className="text-gray-700 leading-relaxed text-justify">
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
        <p className="text-gray-700 leading-relaxed text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          viverra, justo at malesuada pulvinar, velit ligula viverra
          sapien, sit amet lacinia erat augue nec libero. Morbi eget
          augue a metus volutpat feugiat.
        </p>
      </section>
    </div>
  );
}

export default Home;