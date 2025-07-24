import { useState } from "react";
import "./App.css";
import Exam from "./components/Exam";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Pages/Profile";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/profile" element={<Dashboard />}/>
          <Route path="/exam/:examType" element={<Exam />}/>
        </Routes>
        <ToastContainer position="top-center"/>
      </Router>
    </>
  );
}

export default App;
