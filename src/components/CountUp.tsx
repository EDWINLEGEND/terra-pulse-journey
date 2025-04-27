
import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;
    const endValue = end;
    
    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const value = startValue + (progress * (endValue - startValue));
      countRef.current = value;
      setCount(value);
      
      if (progress < 1) {
        timerRef.current = requestAnimationFrame(updateCount);
      }
    };
    
    timerRef.current = requestAnimationFrame(updateCount);
    
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [end, duration]);

  const formatNumber = (num: number) => {
    return num.toFixed(decimals);
  };

  return <span className={className}>{prefix}{formatNumber(count)}{suffix}</span>;
};

export default CountUp;
