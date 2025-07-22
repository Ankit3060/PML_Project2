import { useState } from "react";
import "./App.css";
import Accordion from "./components/Accordion";
import Exam from "./components/Exam";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/exam" element={<Exam />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
