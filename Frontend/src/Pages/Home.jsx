import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext';
import axios from 'axios';
import "./Home.css"
import Dashboard from './Dashboard';

function Home() {
  const { setIsAuthenticated, user, setUser } = useAuth();
  const [click, setClick] = useState("")
  console.log(click)

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

  return (
    <>
    <div className='flex flex-row h-screen justify-center'>

      <div className=' py-12 max-w-5xl mx-auto '>
        <h1 className='text-4xl font-bold mb-6 text-center text-blue-700'>Dashboard</h1>
        <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Exams!!</h2>
        <button 
            className='text-xl px-2 py-1 mx-4 mt-3 bg-blue-300 hover:bg-blue-400 cursor-pointer rounded-lg'
            onClick={()=>{setClick("react")}}
        >
            React
        </button><br/>
        <button 
            className='text-xl px-2 py-1 mx-4 mt-3 bg-blue-300 hover:bg-blue-400 cursor-pointer rounded-lg'
            onClick={()=>{setClick("javaScript")}}
        >
            JavaScript
        </button><br/>
        <button 
            className='text-xl px-2 py-1 mx-4 mt-3 bg-blue-300 hover:bg-blue-400 cursor-pointer rounded-lg'
            onClick={()=>{setClick("html")}}
        >
            HTML
        </button><br/>
        <button 
            className='text-xl px-2 py-1 mx-4 mt-3 bg-blue-300 hover:bg-blue-400 cursor-pointer rounded-lg'
            onClick={()=>{setClick("css")}}
        >
            CSS
        </button><br/>

      </div>

       <div className="h-full w-px bg-gray-400 mx-4"></div>

       <div className='px-6 py-12 max-w-5xl mx-auto'>
        {click==="react"?<section className='px-6 py-12 max-w-5xl mx-auto'><Dashboard /></section>  : 

        <div className="px-6 py-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          {`Welcome to SkillStack! ${user?.firstName || 'Guest'}`}
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel nisl a metus tincidunt suscipit. Integer
            non magna sed libero congue gravida in sed metus. Aenean ac magna vel lacus placerat tincidunt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Why Choose Us?</h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut lacinia augue. Sed at sapien at libero tristique
            facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Get Started</h2>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra, justo at malesuada pulvinar, velit ligula
            viverra sapien, sit amet lacinia erat augue nec libero. Morbi eget augue a metus volutpat feugiat.
          </p>
        </section>
        </div>

        }
       </div>

      

    </div>
    </>
  )
}

export default Home