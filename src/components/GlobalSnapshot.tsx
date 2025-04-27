
import { useEffect, useRef } from 'react';
import CountUp from './CountUp';
import { Thermometer, CloudSun, Globe, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  suffix: string;
  description: string;
  delay: number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, suffix, description, delay, color = "from-ocean-500 to-terra-500" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <div 
      ref={cardRef}
      className={cn(
        "card-glass opacity-0",
        "flex flex-col items-center p-6 bg-gradient-to-br",
        `from-${color}`
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-3 rounded-full bg-white/20 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-3xl font-bold mb-2">
        <CountUp end={value} decimals={1} suffix={suffix} />
      </p>
      <p className="text-sm text-center opacity-80">{description}</p>
    </div>
  );
};

const GlobalSnapshot: React.FC = () => {
  return (
    <section id="global-snapshot" className="container-section">
      <div className="text-center mb-12">
        <h2 className="mb-4">Global Climate Snapshot</h2>
        <p className="max-w-2xl mx-auto text-lg opacity-80">
          Key metrics that show the current state of our planet's climate and highlight the urgent need for action
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Thermometer size={24} className="text-sunset-500" />}
          title="Global Temperature"
          value={1.1}
          suffix="°C"
          description="Rise above pre-industrial levels"
          delay={200}
          color="sunset-400 to-sunset-600"
        />
        <StatCard 
          icon={<CloudSun size={24} className="text-ocean-500" />}
          title="CO₂ Concentration"
          value={419.3}
          suffix=" ppm"
          description="Parts per million in atmosphere"
          delay={400}
          color="ocean-400 to-ocean-600"
        />
        <StatCard 
          icon={<Globe size={24} className="text-terra-500" />}
          title="Sea Level Rise"
          value={3.4}
          suffix=" mm/yr"
          description="Annual rate of rise since 1993"
          delay={600}
          color="terra-400 to-terra-600"
        />
        <StatCard 
          icon={<Award size={24} className="text-slate-200" />}
          title="Arctic Ice Loss"
          value={12.8}
          suffix="%"
          description="Reduction per decade since 1979"
          delay={800}
          color="blue-400 to-ocean-600"
        />
      </div>
    </section>
  );
};

export default GlobalSnapshot;
