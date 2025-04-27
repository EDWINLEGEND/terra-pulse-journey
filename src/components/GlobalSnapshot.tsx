import { useState, useEffect, useRef } from 'react';
import CountUp from './CountUp';
import { Thermometer, CloudSun, Globe, Award, Info, AlertTriangle, CornerRightDown, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  suffix: string;
  description: string;
  delay: number;
  color?: string;
  impactLevel?: 'high' | 'severe' | 'critical';
  thresholdInfo?: string;
  sourceUrl?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  title, 
  value, 
  suffix, 
  description, 
  delay, 
  color = "from-ocean-500 to-terra-500",
  impactLevel,
  thresholdInfo,
  sourceUrl
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showThreshold, setShowThreshold] = useState(false);
  const [showSource, setShowSource] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add('animate-count-up');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Get impact level styling
  const getImpactBadge = () => {
    switch(impactLevel) {
      case 'high':
        return <span className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500/70 text-white">High Impact</span>;
      case 'severe':
        return <span className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold bg-orange-500/70 text-white">Severe Impact</span>;
      case 'critical':
        return <span className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold bg-red-500/70 text-white">Critical Impact</span>;
      default:
        return null;
    }
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "card-glass opacity-0 relative group",
        "flex flex-col items-center p-8 bg-gradient-to-br",
        `from-${color}`,
        "hover:shadow-lg hover:shadow-ocean-500/20 transition-all duration-300"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {getImpactBadge()}
      
      <div className="p-4 rounded-full bg-white/20 mb-5 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-1 tracking-tight text-center">{title}</h3>
      
      <p className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
        <CountUp end={value} decimals={1} suffix={suffix} />
      </p>
      
      <p className="text-sm text-center opacity-80 mb-4">{description}</p>
      
      <div className="flex mt-1 space-x-2">
        {description && (
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              aria-label="More information"
            >
              <Info size={18} className="text-white/70" />
            </button>
            
            {showInfo && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-64 p-3 mb-2 rounded-lg glass animate-fade-in z-10">
                <p className="text-sm">{description}</p>
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 glass rotate-45"></div>
              </div>
            )}
          </div>
        )}
        
        {thresholdInfo && (
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              onMouseEnter={() => setShowThreshold(true)}
              onMouseLeave={() => setShowThreshold(false)}
              aria-label="Threshold information"
            >
              <AlertTriangle size={18} className="text-sunset-400" />
            </button>
            
            {showThreshold && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-64 p-3 mb-2 rounded-lg glass animate-fade-in z-10">
                <p className="text-sm font-medium mb-1">Critical Threshold:</p>
                <p className="text-sm">{thresholdInfo}</p>
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 glass rotate-45"></div>
              </div>
            )}
          </div>
        )}
        
        {sourceUrl && (
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              onMouseEnter={() => setShowSource(true)}
              onMouseLeave={() => setShowSource(false)}
              aria-label="Data source"
            >
              <Bookmark size={18} className="text-ocean-400" />
            </button>
            
            {showSource && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-64 p-3 mb-2 rounded-lg glass animate-fade-in z-10">
                <p className="text-sm font-medium mb-1">Data Source:</p>
                <a 
                  href={sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-ocean-400 hover:underline flex items-center"
                >
                  View Source <CornerRightDown size={12} className="ml-1" />
                </a>
                <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 glass rotate-45"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const GlobalSnapshot: React.FC = () => {
  // Interactive effect for the section
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      id="global-snapshot" 
      className="container-section relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-ocean-900/50 to-transparent rounded-3xl -z-10 transition-opacity duration-1000",
          isHovered ? "opacity-80" : "opacity-40"
        )}
      ></div>
      
      <div className="relative">
        {/* Interactive dots representing data sources */}
        <div className="absolute inset-0 overflow-hidden -z-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-ocean-500/30 animate-pulse"
              style={{
                width: `${Math.random() * 10 + 3}px`,
                height: `${Math.random() * 10 + 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-ocean-500/20 backdrop-blur-sm">
            <span className="text-sm font-medium">Real-time climate insights</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight leading-tight" style={{ letterSpacing: '-0.025em' }}>
            Global Climate Snapshot
          </h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80">
            Key metrics that show the current state of our planet's climate and highlight 
            the urgent need for immediate and sustained action.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <StatCard 
            icon={<Thermometer size={32} className="text-sunset-500" />}
            title="Global Temperature"
            value={1.1}
            suffix="°C"
            description="Rise above pre-industrial levels, leading to more frequent extreme weather events."
            delay={200}
            color="sunset-400 to-sunset-600"
            impactLevel="severe"
            thresholdInfo="The Paris Agreement aims to limit warming to 1.5°C. Above 2°C, catastrophic and irreversible changes may occur."
            sourceUrl="https://climate.nasa.gov/vital-signs/global-temperature/"
          />
          
          <StatCard 
            icon={<CloudSun size={32} className="text-ocean-500" />}
            title="CO₂ Concentration"
            value={419.3}
            suffix=" ppm"
            description="Parts per million in atmosphere, highest in 800,000 years."
            delay={400}
            color="ocean-400 to-ocean-600"
            impactLevel="critical"
            thresholdInfo="Pre-industrial levels were about 280 ppm. Levels above 450 ppm likely commit us to warming beyond 2°C."
            sourceUrl="https://gml.noaa.gov/ccgg/trends/"
          />
          
          <StatCard 
            icon={<Globe size={32} className="text-terra-500" />}
            title="Sea Level Rise"
            value={3.4}
            suffix=" mm/yr"
            description="Annual rate of rise since 1993, threatening coastal communities worldwide."
            delay={600}
            color="terra-400 to-terra-600"
            impactLevel="high"
            thresholdInfo="Sea levels are projected to rise 0.3-1.2 meters by 2100, threatening millions in coastal regions."
            sourceUrl="https://sealevel.nasa.gov/"
          />
          
          <StatCard 
            icon={<Award size={32} className="text-blue-400" />}
            title="Arctic Ice Loss"
            value={12.8}
            suffix="%"
            description="Reduction per decade since 1979, accelerating global warming through decreased albedo."
            delay={800}
            color="blue-400 to-ocean-600"
            impactLevel="critical"
            thresholdInfo="The Arctic could experience ice-free summers as early as 2035, drastically changing global climate patterns."
            sourceUrl="https://climate.nasa.gov/vital-signs/arctic-sea-ice/"
          />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm opacity-70 max-w-2xl mx-auto">
            Data updated monthly from scientific sources including NASA, NOAA, and the Intergovernmental Panel on Climate Change (IPCC).
          </p>
          <div className="mt-8">
            <a 
              href="#data-charts" 
              className="inline-flex items-center px-6 py-3 rounded-full bg-ocean-800/50 hover:bg-ocean-700/50 transition-colors text-white/90 backdrop-blur-sm"
            >
              <span>Explore Historical Trends</span>
              <div className="ml-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowDown size={14} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ArrowDown = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>
);

export default GlobalSnapshot;
