import { useState } from "react";
import "./App.css";
import Exam from "./components/Exam";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Profile from "./Pages/Profile";
import ViewPaper from "./components/viewPaper";
import Dashboard from "./Pages/Dashboard";
import ExamSidebar from "./components/ExamSidebar";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <ExamSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/exam/:examType" element={<Exam />} />
          <Route path="/dashboard/:examType" element={<Dashboard />} />
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
      </Router>
    </>
  );
}

export default App;
