import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

export default function Timer({ onTimeUp, resetSignal }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    setTimeLeft(60);
    setTimerActive(true); 
  }, [resetSignal]);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
    }

    if (timerActive && timeLeft === 0) {
      onTimeUp();
      setTimerActive(false); 
    }

    return () => clearInterval(timer);
  }, [timeLeft, timerActive, onTimeUp]);

  return (
    <Typography variant="h6" sx={{ color: 'black' }}>
      {`${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}
    </Typography>
  );
}
