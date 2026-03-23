import React, { useEffect, useState } from 'react';

interface TimerRingProps {
  duration: number; // in seconds
  size?: number;
  onComplete?: () => void;
}

export function TimerRing({ duration, size = 120, onComplete }: TimerRingProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);
  
  const progress = (timeLeft / duration) * 100;
  const circumference = 2 * Math.PI * 50;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r="50"
          stroke="rgba(212, 175, 55, 0.2)"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r="50"
          stroke="#D4AF37"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
          style={{ filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl text-[#D4AF37]">{timeLeft}s</span>
      </div>
    </div>
  );
}
