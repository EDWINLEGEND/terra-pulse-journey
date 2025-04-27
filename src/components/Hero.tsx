import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Parallax mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Parallax Layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-sky-400 to-ocean-600 dark:from-sky-900 dark:to-ocean-900"
      ></div>
      
      <div 
        className="absolute inset-0 animate-parallax-slow"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg' fill='%23ffffff33'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.652 1.26 4.45 2.2 6.452 2.2 2.61 0 5.2-1.2 6.257-1.833.108-.07.485.056 1.22.37C39.072 22.953 42.37 24 45.8 24c4.202 0 8.517-1.62 10.986-2.93.685-.363 1.27-.687 1.77-.363 4.02 2.66 11.760 2.66 15.78 0 .5-.324 1.085 0 1.77.363C78.583 22.38 82.898 24 87.1 24c3.43 0 6.728-1.047 9.8-3.412.735-.313 1.112-.44 1.22-.37 1.056.634 3.647 1.832 6.257 1.832 2 0 4.8-.94 6.452-2.2.168-.126.53 0 .887.14.36.133.66.276.66.41 0 .162-.18.307-.368.445-.188.138-.38.254-.562.371-.444.292-1.04.523-1.74.523-2.87 0-5.64-1.02-7.424-1.856-.887-.434-1.625-.426-2.36-.075C98.208 21.27 94.58 23 89.523 23c-3.96 0-7.81-1.49-10.296-2.76-.98-.504-1.4-.65-2.26-.154C74.2 21.53 70.3 23 66.3 23s-7.8-1.47-10.666-2.913c-.86-.497-1.278-.35-2.26.153C50.903 21.51 47.053 23 43.093 23c-5.06 0-8.707-1.73-11.15-3.224-.735-.35-1.473-.36-2.36.076C27.8 21.69 25.028 22.71 22.16 22.71c-.702 0-1.297-.23-1.742-.523-.182-.118-.374-.234-.562-.372C19.667 21.677 19.487 21.53 19.487 21.37c0-.134.3-.277.66-.41z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6,
          transform: `translate(${offset.x * -0.1}px, ${offset.y * -0.1}px)`,
        }}
      ></div>
      
      <div 
        className="absolute inset-0 animate-parallax-medium"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg' fill='%23ffffff66'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.652 1.26 4.45 2.2 6.452 2.2 2.61 0 5.2-1.2 6.257-1.833.108-.07.485.056 1.22.37C39.072 22.953 42.37 24 45.8 24c4.202 0 8.517-1.62 10.986-2.93.685-.363 1.27-.687 1.77-.363 4.02 2.66 11.760 2.66 15.78 0 .5-.324 1.085 0 1.77.363C78.583 22.38 82.898 24 87.1 24c3.43 0 6.728-1.047 9.8-3.412.735-.313 1.112-.44 1.22-.37 1.056.634 3.647 1.832 6.257 1.832 2 0 4.8-.94 6.452-2.2.168-.126.53 0 .887.14.36.133.66.276.66.41 0 .162-.18.307-.368.445-.188.138-.38.254-.562.371-.444.292-1.04.523-1.74.523-2.87 0-5.64-1.02-7.424-1.856-.887-.434-1.625-.426-2.36-.075C98.208 21.27 94.58 23 89.523 23c-3.96 0-7.81-1.49-10.296-2.76-.98-.504-1.4-.65-2.26-.154C74.2 21.53 70.3 23 66.3 23s-7.8-1.47-10.666-2.913c-.86-.497-1.278-.35-2.26.153C50.903 21.51 47.053 23 43.093 23c-5.06 0-8.707-1.73-11.15-3.224-.735-.35-1.473-.36-2.36.076C27.8 21.69 25.028 22.71 22.16 22.71c-.702 0-1.297-.23-1.742-.523-.182-.118-.374-.234-.562-.372C19.667 21.677 19.487 21.53 19.487 21.37c0-.134.3-.277.66-.41z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: '150% 150%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7,
          transform: `translate(${offset.x * -0.2}px, ${offset.y * -0.2}px)`,
        }}
      ></div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-2/3 animate-parallax-fast"
        style={{ 
          background: 'radial-gradient(ellipse at center bottom, rgba(14, 165, 233, 0.3) 0%, rgba(14, 165, 233, 0) 70%)',
          transform: `translate(${offset.x * -0.3}px, ${offset.y * -0.3}px)`,
        }}
      ></div>
      
      {/* Earth image with parallax */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end justify-center"
        style={{
          transform: `translate(${offset.x * -0.5}px, ${offset.y * -0.4}px)`,
        }}
      >
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQwMCAwQzYyMS43OTggMCA4MDAgMTc5LjA4NiA4MDAgNDAwSDBDMCAxNzkuMDg2IDE3OC4yMDIgMCA0MDAgMHoiIGZpbGw9IiMxMDRlN2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] bg-bottom bg-no-repeat bg-contain opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 className="text-white mb-4 drop-shadow-lg opacity-0 animate-fade-in-up tracking-tight font-bold leading-tight" style={{ animationDelay: '0.3s', letterSpacing: '-0.025em' }}>
          Our Planet, Our Future
        </h1>
        <p className="text-white/90 max-w-2xl text-lg md:text-xl mb-8 drop-shadow-md opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Explore the impact of climate change and discover how we can make a difference for generations to come.
        </p>
        <a 
          href="#global-snapshot" 
          className={cn(
            "btn-primary opacity-0 animate-fade-in-up animate-pulse-glow group",
            "flex items-center gap-2"
          )}
          style={{ animationDelay: '0.9s' }}
        >
          Begin the Journey
          <ArrowDown className="group-hover:translate-y-1 transition-transform" size={16} />
        </a>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce opacity-0 animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <ArrowDown className="text-white/70" size={24} />
      </div>
    </section>
  );
};

export default Hero;
