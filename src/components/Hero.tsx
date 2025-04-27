import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowDown, Info, Sparkles, Globe, BarChart3, ThermometerSun, Cloud, Waves } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ClimateIndicator {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  description: string;
}

// StatCard component for animated key metrics
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  color: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, unit, color, delay }) => {
  return (
    <motion.div 
      className={`glass-card border border-white/10 flex flex-col items-center p-4 rounded-2xl overflow-hidden relative ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/5 blur-xl"></div>
      </div>
      
      <div className="z-10 w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-xs font-medium tracking-wide uppercase text-white/60">{label}</span>
        </div>
        
        <div className="flex items-baseline">
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          <span className="ml-1 text-sm opacity-70">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Interactive globe animation component
const GlobeAnimation: React.FC = () => {
  const [isRotating, setIsRotating] = useState(true);
  const globeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current && isRotating) {
        const currentRotation = globeRef.current.style.transform || 'rotateY(0deg)';
        const currentDegrees = parseInt(currentRotation.replace(/[^0-9]/g, '') || '0');
        const newDegrees = (currentDegrees + 1) % 360;
        globeRef.current.style.transform = `rotateY(${newDegrees}deg)`;
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [isRotating]);
  
  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      onClick={() => setIsRotating(!isRotating)}
    >
      <div 
        ref={globeRef} 
        className="globe transition-all duration-500"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 rounded-full border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-ocean-800/50"></div>
          <div className="absolute w-full h-full">
            {/* Using a gradient background as fallback instead of an image */}
            <div 
              className="absolute inset-0 bg-gradient-radial from-blue-500 to-blue-800 opacity-80"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(25,118,210,1) 0%, rgba(12,74,110,1) 100%)`,
              }}
            ></div>
          </div>
          
          {/* Animated elements on the globe */}
          <div className="absolute top-[25%] left-[40%] w-2 h-2 rounded-full bg-yellow-500/70 animate-pulse"></div>
          <div className="absolute top-[30%] left-[70%] w-1.5 h-1.5 rounded-full bg-teal-500/70 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-[65%] left-[30%] w-2 h-2 rounded-full bg-red-500/70 animate-pulse" style={{animationDelay: '0.7s'}}></div>
        </div>
        
        {/* Atmosphere effect */}
        <div className="absolute inset-0 rounded-full border-4 border-sky-500/10 blur-xl"></div>
        <div className="absolute inset-0 scale-[1.15] rounded-full border border-sky-500/5 blur-lg"></div>
      </div>
      
      {!isRotating && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white/80 bg-black/30 backdrop-blur-sm rounded-md px-2 py-1">
          Click to {isRotating ? 'pause' : 'rotate'}
        </div>
      )}
    </div>
  );
};

// InfoPanel to show various quick facts
const InfoPanel: React.FC = () => {
  const facts = [
    "The planet has already warmed by 1.1°C since pre-industrial times.",
    "Sea levels rose by 20cm in the last century and the rate is accelerating.",
    "The last decade was the warmest on record.",
    "Arctic sea ice is declining at a rate of 13% per decade.",
    "We need to reach net-zero emissions by 2050 to limit warming to 1.5°C."
  ];
  
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    let interval: any;
    if (isVisible) {
      interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % facts.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [facts.length, isVisible]);
  
  return (
    <div className="absolute top-4 right-4 z-20">
      <button 
        className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
        onClick={() => setIsVisible(!isVisible)}
      >
        <Info size={18} className="text-white" />
      </button>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="absolute top-12 right-0 w-64 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-[-6px] right-4 w-3 h-3 bg-black/40 border-t border-l border-white/10 transform rotate-45"></div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1 text-white">
              <Sparkles size={14} className="text-yellow-500" />
              Climate Fact
            </h4>
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentFactIndex}
                className="text-sm text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {facts[currentFactIndex]}
              </motion.p>
            </AnimatePresence>
            <div className="flex mt-3 gap-1">
              {facts.map((_, i) => (
                <button 
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === currentFactIndex ? 'bg-white w-6' : 'bg-white/30 w-2'}`}
                  onClick={() => setCurrentFactIndex(i)}
                ></button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%']);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const ref = useRef<HTMLDivElement>(null);
  
  // Blinking cursor effect for typing animation
  const [showCursor, setShowCursor] = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullText = "Visualizing our changing planet in real-time";
  
  useEffect(() => {
    // Typing animation effect
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 70);
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);
  
  useEffect(() => {
    // Blinking cursor effect
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative overflow-hidden h-screen" ref={ref}>
      <InfoPanel />
      
      {/* Dynamic background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-ocean-900"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-ocean-600/10 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-terra-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-sunset-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Star-like particles */}
        <div className="stars absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i} 
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${(Math.random() * 2) + 1}px`,
                height: `${(Math.random() * 2) + 1}px`,
                animationDuration: `${(Math.random() * 3) + 2}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        style={{ 
          y: springY, 
          opacity 
        }}
      >
        <div className="max-w-5xl mx-auto text-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="text-sm font-medium tracking-wide flex items-center gap-1.5">
                <Globe size={14} className="text-ocean-400" /> 
                Climate Change Tracker
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight" style={{ letterSpacing: '-0.03em' }}>
              Terra Pulse Journey
            </h1>
            
            <div className="h-12">
              <p className="text-xl md:text-2xl font-light text-white/80">
                {typedText}
                <span className={`inline-block w-2 h-5 bg-ocean-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StatCard 
              icon={<ThermometerSun size={20} className="text-sunset-300" />} 
              label="Temperature"
              value="+1.1"
              unit="°C"
              color="from-sunset-900/30 to-sunset-800/10"
              delay={0.1}
            />
            <StatCard 
              icon={<Cloud size={20} className="text-terra-300" />} 
              label="CO2 Level"
              value="417"
              unit="ppm"
              color="from-terra-900/30 to-terra-800/10"
              delay={0.2}
            />
            <StatCard 
              icon={<Waves size={20} className="text-ocean-300" />} 
              label="Sea Level"
              value="+20"
              unit="cm"
              color="from-ocean-900/30 to-ocean-800/10"
              delay={0.3}
            />
            <StatCard 
              icon={<BarChart3 size={20} className="text-green-300" />} 
              label="Arctic Ice"
              value="-13%"
              unit="/decade"
              color="from-green-900/30 to-green-800/10"
              delay={0.4}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center"
          >
            <a 
              href="#climate-snapshot" 
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 hover:bg-white/90 transition-colors"
            >
              <span className="font-medium">Explore Data</span>
              <ArrowDown size={16} />
            </a>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Visual element - Animated Globe */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div 
          className="relative w-[400px] h-[400px] opacity-20"
          style={{ scale }}
        >
          <GlobeAnimation />
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-5 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          ></motion.div>
        </div>
        <span className="text-xs font-medium mt-2 text-white/50">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;

// Add these animation classes to your globals.css
/*
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  animation: twinkle 5s infinite;
}

@keyframes twinkle {
  0% { opacity: 0; }
  50% { opacity: 0.8; }
  100% { opacity: 0; }
}
*/
