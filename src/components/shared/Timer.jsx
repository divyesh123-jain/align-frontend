import { useState, useEffect } from 'react';

export default function Timer({ initialSeconds = 60, onTimerEnd }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isLowTime, setIsLowTime] = useState(false);

  useEffect(() => {
    setIsLowTime(seconds <= 10 && seconds > 0);

    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0 && onTimerEnd) {
      onTimerEnd();
    }
  }, [seconds, onTimerEnd]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`px-3 py-1 rounded-md transition-colors duration-200 ${
        isLowTime 
          ? 'bg-red-100 border border-red-200' 
          : 'bg-gray-100'
      }`}>
        <span className={`text-sm font-mono font-medium ${
          isLowTime ? 'text-red-600' : 'text-gray-600'
        }`}>
          {formatTime(seconds)}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        <span className={isLowTime ? 'animate-pulse' : ''}>⏰</span>
      </div>
    </div>
  );
} 