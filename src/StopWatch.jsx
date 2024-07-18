import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elpasedTime, setElpasedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElpasedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = new Date() - elpasedTime;
  };
  const stop = () => {
    setIsRunning(false);
  };
  const reset = () => {
    setElpasedTime(0);
    setIsRunning(false);
  };
  const formatTime = () => {
    let hours = Math.floor(elpasedTime /(1000 * 60 * 60))
    let minutes = Math.floor(elpasedTime /(1000 * 60) % 60)
    let secounds = Math.floor(elpasedTime /(1000) % 60)
    let millisecounds = Math.floor((elpasedTime % 1000) /10)

    hours = String(hours).padStart(2, '0')
    minutes = String(minutes).padStart(2, '0')
    secounds = String(secounds).padStart(2, '0')
    millisecounds = String(millisecounds).padStart(2, '0')

    return `${minutes}:${secounds}:${millisecounds}`
    // return `${addZero(minutes)}:${addZero(secounds)}:${addZero(millisecounds)}`;
  };

//   const addZero = (number) =>{
//     return (number < 10 ? '0' : '') + number
//   }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button onClick={start} className="start-button">
          Start
        </button>
        <button onClick={stop} className="stop-button">
          Stop
        </button>
        <button onClick={reset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
