import React,{useState, useEffect} from 'react';
import "../App.css";
import { useMarks } from '../context/marksContext';
import Popup from './Popup';
import Accordion from './Accordion';
import { useNavigate } from 'react-router-dom';

function Exam() {
    const [seconds, setSeconds] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { totalMarks } = useMarks();

    const navigate = useNavigate();

    useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    if (isReload) {
      navigate("/", { replace: true });
    }
  }, [navigate]);


    useEffect(() => {
      let interval;

      if(seconds<10) {
        interval = setInterval(() => {
          setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);
      }else if(seconds >= 10) {
        setIsPopupOpen(true)
        clearInterval(interval);
        // alert("Time's up");
      }

      return () => clearInterval(interval);
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    

  return (
    <>
        <div className='timer'>
            <div className='timer-text'>
                Timer {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
            </div>
            
            <div className='score'>
            Score: {totalMarks}
            </div>
        </div>

        {isPopupOpen && <Popup 
          isOpen={isPopupOpen}
        />}

        <Accordion />
        
    </>
  )
}

export default Exam