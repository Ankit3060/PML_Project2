import { useState } from "react";
import "./App.css";
import Exam from "./components/Exam";
import {BrowserRouter as Router, Routes, Route, createBrowserRouter} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
// import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Profile from "./Pages/Profile";
import ViewPaper from "./components/viewPaper";
import Dashboard from "./Pages/Dashboard";
// import ExamSidebar from "./components/ExamSidebar";
import Layout from "./Layout/Layout";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/profile", element: <Profile /> },
        { path: "/exam/:examType", element: <Exam /> },
        { path: "/dashboard/:examType", element: <Dashboard /> },
        { path: "/view-paper/:examId", element: <ViewPaper /> },
      ]
    }
  ]);
  return (
    <>
      {/* <Router>
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <ExamSidebar isOpen={isOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/exam/:examType" element={<Exam />} />
          <Route path="/dashboard/:examType" element={<Dashboard isOpen={isOpen}/>} />
          <Route path="/view-paper/:examId" element={<ViewPaper />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
      </Router> */}
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
    </>
  );
}

export default App;
