import React, { useState, useEffect, useRef } from "react";
import { useMarks } from "../context/marksContext";
import Popup from "./Popup";
import Accordion from "./Accordion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function Exam() {
  const { examType } = useParams();
  const [seconds, setSeconds] = useState(1800);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { totalMarks } = useMarks();
  const { user } = useAuth();
  const [marks, setMarks] = useState([]);
  const [data, setData] = useState([]);
  const submitted = useRef(false);
  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (submitted.current || isSubmitting) return;

    submitted.current = true;
    setIsSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/exam/data/save-marks`,
        {
          userId: user.id,
          examType: examType,
          marks: marks.length * 4,
          totalQuestions: data.length,
          answer: answers
        },
        { withCredentials: true }
      );

      toast.success("Exam submitted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit the exam");
      submitted.current = false;
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPopupOpen(true);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // return is for cleanup to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [marks, data]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <>
      <div>
        <div className="timer">
          <div className="timer-text">
            Timer {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
          </div>
          <div className="score">Score: {totalMarks}</div>
        </div>

        {isPopupOpen && <Popup isOpen={isPopupOpen} />}

        <Accordion
          marks={marks}
          setMarks={setMarks}
          data={data}
          setData={setData}
          examType={examType}
          setAnswers={setAnswers}
          answers={answers}
        />

        <div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            } text-white font-semibold px-6 py-3 rounded-md transition duration-300 absolute right-6 text-lg shadow-md`}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Exam;
