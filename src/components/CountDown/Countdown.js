import React, { useState, useEffect } from "react";
import "./Countdown.css";

const Countdown = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(seconds * 1000) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="countdown">
      {timeLeft.days > 0 && (
        <div className="countdown-item days">
          <span className="countdown-value">{timeLeft.days}</span>
          <span className="countdown-label">days</span>
        </div>
      )}
      <div className="countdown-item hours">
        <span className="countdown-value">{timeLeft.hours}</span>
        <span className="countdown-label">hours</span>
      </div>
      <div className="countdown-item minutes">
        <span className="countdown-value">{timeLeft.minutes}</span>
        <span className="countdown-label">minutes</span>
      </div>
    </div>
  );
};

export default Countdown;
