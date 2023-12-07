import React, {useEffect, useState} from "react";

function Timer({ initialSeconds }) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
    // Exit early if countdown is finished
        if (seconds <= 0) {
        return;
        }

    // Set up the timer
    const timer = setInterval(() => {
    setSeconds((prevSeconds) => prevSeconds-1);
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
    }, [seconds]);

    // Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
    const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2,'0');
    return `${minutes}:${seconds}`;
    };

    return (
    <div>
    <h3>Earn as many points as you can in 5 minutes</h3>
    <p>{formatTime(seconds)}</p>
    </div>
    );
}

export default Timer;