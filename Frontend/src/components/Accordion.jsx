import { useState } from "react";
import "../App.css";
import { useEffect } from "react";
import axios from "axios";

function Accordion() {
  const [arrow, setArrow] = useState(null);
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const handleClick = (index) => {
    setArrow(arrow === index ? null : index);
  };

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/exam/questions`,
          {
            withCredentials: true,
          }
        );  
        // console.log(response.data.data);
        const questions = response.data.data;
        setData(questions);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, []);


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    // console.log("Selected option:", e.target.value);
  }

  return (
    <>
      {data.map((item, index) => {
        const isCorrects = item.answer === selectedOption;
        return(
        <div key={index} className="">
          <div className="flex items-center px-4">
            <button className="accordion " onClick={() => handleClick(index)}>
              {item.question}
              <span className="absolute cursor-pointer right-10">{arrow === index ? "▲" : "▼"}</span>
            </button>
          </div>
        
          <div  className={`panel ${arrow === index ? "open" : "close"}`}>
            <p className="text-gray-500 mb-2">Select the correct options:</p>
            {item.options.map((option, optionIndex) => {
              const isSelected = selectedOption === option;
              const isCorrect = item.answer === option;
              return (
                <div key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                  className="mr-2 cursor-pointer"
                  onChange={handleOptionChange}
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
                { isSelected && (
                  <span className={`ml-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                    {isCorrect ? "✅" : "❌"}
                  </span>
                )}
              </div>
            )})}

            {isCorrects ? <p className="text-green-400 mt-2">{item.description}</p> : null}

          </div>
        </div>
      )})}
    </>
  );
}

export default Accordion;
