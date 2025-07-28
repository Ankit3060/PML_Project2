import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useMarks } from "../context/marksContext";
import Pagination from "./Pagination";
import { useAuth } from "../context/authContext";

function Accordion({ marks, setMarks, data, setData, examType, setAnswers }) {
  const [arrow, setArrow] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { setTotalMarks } = useMarks();

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const { setUser, setIsAuthenticated } = useAuth();

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

  const handleClick = (index) => {
    setArrow(arrow === index ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/exam/questions/${examType}`,
          { withCredentials: true }
        );
        const questions = response.data.data;
        setData(questions);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleOptionChange = (questionIndex, selectedValue) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: selectedValue,
    }));

    const question = data[questionIndex];
    if (question.answer === selectedValue) {
      setMarks((prev) => {
        if (!prev.includes(questionIndex)) {
          return [...prev, questionIndex];
        }
        return prev;
      });
    } else {
      setMarks((prev) => prev.filter((index) => index !== questionIndex));
    }
    setAnswers((prev) => {
    const updated = prev.filter((ans) => ans.questionId !== question.id);
    return [
      ...updated,
      {
        questionId: question.id,
        questionText: question.question,
        options: question.options,
        selectedAnswer: selectedValue,
        correctAnswer: question.answer,
        isCorrect: question.answer === selectedValue,
      },
    ];
  });
  };


  useEffect(() => {
    setTotalMarks(marks.length*4);
  }, [marks, setTotalMarks]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {currentPosts.map((item, index) => {
        const actualIndex = firstPostIndex + index;
        const selected = selectedOptions[actualIndex];

        return (
          <div key={actualIndex}>
            <div className="flex items-center px-4">
              <button
                className="accordion text-left w-full font-medium"
                onClick={() => handleClick(actualIndex)}
              >
                {item.question}
                <span className="absolute cursor-pointer right-15">
                  {arrow === actualIndex ? "▲" : "▼"}
                </span>
              </button>
            </div>

            <div
              className={`panel ${arrow === actualIndex ? "open" : "close"
                } px-4 mt-2`}
            >
              <p className="text-gray-500 mb-2">Select the correct option:</p>

              {item.options.map((option, optionIndex) => {
                const isSelected = selected === option;
                const isCorrect = item.answer === option;

                return (
                  <div key={optionIndex} className="flex items-center mb-1">
                    <input
                      type="radio"
                      name={`question-${actualIndex}`}
                      value={option}
                      checked={isSelected}
                      onChange={() => handleOptionChange(actualIndex, option)}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      className={`cursor-pointer ${isSelected
                        ? isCorrect
                          ? "text-green-500 font-semibold"
                          : "text-red-500 font-semibold"
                        : "text-black"
                        }`}
                    >
                      {option}
                    </label>
                    {isSelected && (
                      <span className="ml-2">{isCorrect ? "✅" : "❌"}</span>
                    )}
                  </div>
                );
              })}

              {selected === item.answer && (
                <p className="text-green-400 mt-2">{item.description}</p>
              )}
            </div>
          </div>
        );
      })}

      <Pagination
        totalPosts={data.length}
        postsPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}

export default Accordion;