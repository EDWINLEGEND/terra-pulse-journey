import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from '@/lib/utils';

// Sample data - in a real app, this would come from an API
const temperatureData = [
  { year: "1880", value: 0 },
  { year: "1900", value: -0.07 },
  { year: "1920", value: -0.25 },
  { year: "1940", value: 0.12 },
  { year: "1960", value: 0.03 },
  { year: "1980", value: 0.27 },
  { year: "2000", value: 0.61 },
  { year: "2020", value: 1.09 },
];

const co2Data = [
  { year: "1960", value: 317 },
  { year: "1970", value: 325 },
  { year: "1980", value: 339 },
  { year: "1990", value: 354 },
  { year: "2000", value: 369 },
  { year: "2010", value: 390 },
  { year: "2020", value: 414 },
];

const seaLevelData = [
  { year: "1993", value: 0 },
  { year: "1998", value: 10 },
  { year: "2003", value: 20 },
  { year: "2008", value: 35 },
  { year: "2013", value: 60 },
  { year: "2018", value: 80 },
  { year: "2023", value: 100 },
];

interface ChartCardProps {
  title: string;
  description: string;
  data: Array<{ year: string; value: number }>;
  color: string;
  yAxisLabel: string;
  visible: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, description, data, color, yAxisLabel, visible }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [chartVisible, setChartVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setChartVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setChartVisible(false);
    }
  }, [visible]);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "card-glass transition-all duration-500",
        visible ? "opacity-100 transform translate-x-0" : "opacity-0 translate-x-20"
      )}
    >
      <h3 className="text-2xl font-bold mb-2 tracking-tight" style={{ letterSpacing: '-0.025em' }}>{title}</h3>
      <p className="mb-6 opacity-80">{description}</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="currentColor" tick={{ fontSize: 12 }} />
            <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} stroke="currentColor" tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.7)', 
                border: 'none', 
                borderRadius: '4px',
                color: 'white' 
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={3} 
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={chartVisible} 
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DataCharts: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const charts = [
    {
      title: "Global Temperature Rise",
      description: "Annual global temperature anomalies (°C) relative to the 1880-1900 average",
      data: temperatureData,
      color: "#F97316",
      yAxisLabel: "Temperature (°C)"
    },
    {
      title: "Atmospheric CO₂",
      description: "Carbon dioxide concentration in the atmosphere (parts per million)",
      data: co2Data,
      color: "#2DD4BF",
      yAxisLabel: "CO₂ (ppm)"
    },
    {
      title: "Global Sea Level",
      description: "Sea level rise in millimeters since 1993 (satellite era)",
      data: seaLevelData,
      color: "#0EA5E9",
      yAxisLabel: "Sea Level (mm)"
    }
  ];

  const nextChart = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % charts.length);
  };

  const prevChart = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + charts.length) % charts.length);
  };

  return (
    <section id="data-charts" className="container-section">
      <div className="text-center mb-12">
        <h2 className="mb-4 tracking-tight leading-tight" style={{ letterSpacing: '-0.025em' }}>Climate Data Trends</h2>
        <p className="max-w-2xl mx-auto text-lg opacity-80">
          Historical measurements showing how our planet is changing over time
        </p>
      </div>

      <div className="relative">
        <div className="relative h-[500px] overflow-hidden">
          {charts.map((chart, index) => (
            <div 
              key={chart.title}
              className={`absolute inset-0 transition-all duration-500 ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <ChartCard 
                title={chart.title}
                description={chart.description}
                data={chart.data}
                color={chart.color}
                yAxisLabel={chart.yAxisLabel}
                visible={index === activeIndex}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button 
            onClick={prevChart}
            className="p-3 rounded-full glass hover:bg-white/20 transition-colors"
            aria-label="Previous chart"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            {charts.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-ocean-500 scale-125' 
                    : 'bg-gray-400/40 hover:bg-gray-400/60'
                }`}
                aria-label={`Go to chart ${index + 1}`}
              />
            ))}
          </div>
          <button 
            onClick={nextChart}
            className="p-3 rounded-full glass hover:bg-white/20 transition-colors"
            aria-label="Next chart"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DataCharts;
