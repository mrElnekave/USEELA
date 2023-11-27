import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

export default function Timer({ onTimeUp, resetSignal }) {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    setTimeLeft(60);
  }, [resetSignal]);

  useEffect(() => {
    // 退出前清除定时器
    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft-1), 1000);
    if (timeLeft === 0) {
      onTimeUp();
    }
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <Typography variant="h6" sx={{ color: 'black' }}>
      {`${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}
    </Typography>
  );
}
