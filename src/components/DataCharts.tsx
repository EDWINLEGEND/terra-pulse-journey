import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from "recharts";
import { ArrowLeft, ArrowRight, HelpCircle, Download, Share2, ExternalLink, BookOpen } from "lucide-react";
import { cn } from '@/lib/utils';

// Enhanced data with additional details for richer visualizations
const temperatureData = [
  { year: "1880", value: 0, uncertainty: 0.09, event: "Second Industrial Revolution" },
  { year: "1900", value: -0.07, uncertainty: 0.09 },
  { year: "1920", value: -0.25, uncertainty: 0.08 },
  { year: "1940", value: 0.12, uncertainty: 0.07, event: "Post-WWII Industrial Boom" },
  { year: "1960", value: 0.03, uncertainty: 0.06 },
  { year: "1980", value: 0.27, uncertainty: 0.05, event: "Acceleration Period Begins" },
  { year: "2000", value: 0.61, uncertainty: 0.04, event: "Fastest Warming Decade" },
  { year: "2020", value: 1.09, uncertainty: 0.03, event: "Current Crisis Point" },
];

const co2Data = [
  { year: "1960", value: 317, sources: { fossil: 57, deforestation: 24, other: 19 } },
  { year: "1970", value: 325, sources: { fossil: 71, deforestation: 29, other: 21 } },
  { year: "1980", value: 339, sources: { fossil: 95, deforestation: 34, other: 23 } },
  { year: "1990", value: 354, sources: { fossil: 111, deforestation: 40, other: 25 } },
  { year: "2000", value: 369, sources: { fossil: 124, deforestation: 45, other: 27 } },
  { year: "2010", value: 390, sources: { fossil: 149, deforestation: 52, other: 29 } },
  { year: "2020", value: 414, sources: { fossil: 162, deforestation: 58, other: 31 } },
];

const seaLevelData = [
  { year: "1993", value: 0, satellite: 0, tide: 0 },
  { year: "1998", value: 10, satellite: 8, tide: 12 },
  { year: "2003", value: 20, satellite: 18, tide: 22 },
  { year: "2008", value: 35, satellite: 33, tide: 37 },
  { year: "2013", value: 60, satellite: 58, tide: 62 },
  { year: "2018", value: 80, satellite: 78, tide: 82 },
  { year: "2023", value: 100, satellite: 97, tide: 103 },
];

// Additional datasets for new visualizations
const projectionData = [
  { year: "2020", baseline: 1.09, lowEmission: 1.09, highEmission: 1.09 },
  { year: "2040", baseline: 1.5, lowEmission: 1.2, highEmission: 1.8 },
  { year: "2060", baseline: 2.1, lowEmission: 1.4, highEmission: 2.9 },
  { year: "2080", baseline: 2.7, lowEmission: 1.5, highEmission: 3.9 },
  { year: "2100", baseline: 3.2, lowEmission: 1.6, highEmission: 4.8 },
];

interface ChartCardProps {
  title: string;
  subtitle?: string;
  description: string;
  data: Array<any>;
  color: string;
  yAxisLabel: string;
  visible: boolean;
  chartType?: 'line' | 'area' | 'bar' | 'multi';
  dataKeys?: string[];
  sourceUrl?: string;
}

const CustomTooltip = ({ active, payload, label, dataKeys }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-lg backdrop-blur-md shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-${index}`} className="flex items-center mt-1">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">
              {dataKeys && dataKeys[index] ? `${dataKeys[index]}: ` : ''}
              {entry.value}{entry.unit === '°C' ? '°C' : entry.name === 'value' ? '' : ''}
            </span>
          </div>
        ))}
        {payload[0].payload.event && (
          <div className="mt-2 pt-2 border-t border-white/20">
            <span className="text-xs text-ocean-300">{payload[0].payload.event}</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  subtitle, 
  description, 
  data, 
  color, 
  yAxisLabel, 
  visible, 
  chartType = 'line',
  dataKeys = ['value'],
  sourceUrl
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [chartVisible, setChartVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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

  const renderChart = () => {
    switch(chartType) {
      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="currentColor" tick={{ fontSize: 12 }} />
            <YAxis 
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', style: { fill: 'white', opacity: 0.7 } }} 
              stroke="currentColor" 
              tick={{ fontSize: 12 }} 
            />
            <Tooltip content={<CustomTooltip dataKeys={dataKeys} />} />
            <Area 
              type="monotone" 
              dataKey={dataKeys[0]} 
              stroke={color} 
              strokeWidth={3} 
              fillOpacity={1}
              fill={`url(#color-${title})`}
              isAnimationActive={chartVisible} 
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="currentColor" tick={{ fontSize: 12 }} />
            <YAxis 
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', style: { fill: 'white', opacity: 0.7 } }} 
              stroke="currentColor" 
              tick={{ fontSize: 12 }} 
            />
            <Tooltip content={<CustomTooltip dataKeys={dataKeys} />} />
            <Bar 
              dataKey={dataKeys[0]} 
              fill={color} 
              radius={[4, 4, 0, 0]}
              isAnimationActive={chartVisible} 
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </BarChart>
        );
      
      case 'multi':
        const colors = [color, '#2DD4BF', '#F97316'];
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="currentColor" tick={{ fontSize: 12 }} />
            <YAxis 
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', style: { fill: 'white', opacity: 0.7 } }} 
              stroke="currentColor" 
              tick={{ fontSize: 12 }} 
            />
            <Tooltip content={<CustomTooltip dataKeys={dataKeys} />} />
            <Legend
              verticalAlign="top"
              wrapperStyle={{
                paddingBottom: "10px",
                fontSize: "12px",
                opacity: 0.8
              }}
            />
            {dataKeys.map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                name={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                stroke={colors[index % colors.length]} 
                strokeWidth={2} 
                dot={{ fill: colors[index % colors.length], r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={chartVisible} 
                animationDuration={1500}
                animationEasing="ease-in-out"
                animationBegin={index * 200}
              />
            ))}
          </LineChart>
        );
        
      case 'line':
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" stroke="currentColor" tick={{ fontSize: 12 }} />
            <YAxis 
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', style: { fill: 'white', opacity: 0.7 } }} 
              stroke="currentColor" 
              tick={{ fontSize: 12 }} 
            />
            <Tooltip content={<CustomTooltip dataKeys={dataKeys} />} />
            <Line 
              type="monotone" 
              dataKey={dataKeys[0]} 
              stroke={color} 
              strokeWidth={3} 
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={chartVisible} 
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            {dataKeys.length > 1 && dataKeys[1] === 'uncertainty' && (
              <>
                <Line 
                  type="monotone" 
                  dataKey="uncertainty" 
                  stroke={color} 
                  strokeWidth={1} 
                  strokeDasharray="5 5" 
                  dot={false}
                  opacity={0.5}
                  isAnimationActive={chartVisible} 
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  animationBegin={500}
                />
              </>
            )}
          </LineChart>
        );
    }
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "card-glass transition-all duration-500",
        visible ? "opacity-100 transform translate-x-0" : "opacity-0 translate-x-20"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight" style={{ letterSpacing: '-0.025em' }}>{title}</h3>
          {subtitle && <p className="text-sm text-ocean-300 mt-1">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          <button 
            className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            aria-label="Information"
          >
            <HelpCircle size={18} className="text-white/60" />
            {showInfo && (
              <div className="absolute right-0 bottom-full mb-2 w-64 p-3 glass rounded-xl animate-fade-in z-20">
                <p className="text-sm">{description}</p>
                {sourceUrl && (
                  <a 
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ocean-400 text-xs flex items-center mt-2 hover:underline"
                  >
                    View data source <ExternalLink size={10} className="ml-1" />
                  </a>
                )}
                <div className="absolute bottom-[-6px] right-2 w-3 h-3 glass rotate-45"></div>
              </div>
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Download data">
            <Download size={18} className="text-white/60" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Share chart">
            <Share2 size={18} className="text-white/60" />
          </button>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
        <div className="text-xs text-white/50">Data updated: April 2023</div>
        {sourceUrl && (
          <a 
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center text-xs text-ocean-400 hover:text-ocean-300 transition-colors"
          >
            <BookOpen size={12} className="mr-1" />
            Read the research
          </a>
        )}
      </div>
    </div>
  );
};

const DataCharts: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('historic'); // 'historic' or 'future'
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const charts = {
    historic: [
      {
        title: "Global Temperature Rise",
        subtitle: "1880-2020",
        description: "Annual global temperature anomalies (°C) relative to the 1880-1900 average, showing the accelerating warming trend over the past century.",
        data: temperatureData,
        color: "#F97316",
        yAxisLabel: "Temperature (°C)",
        chartType: 'line',
        dataKeys: ['value', 'uncertainty'],
        sourceUrl: "https://climate.nasa.gov/vital-signs/global-temperature/"
      },
      {
        title: "Atmospheric CO₂",
        subtitle: "The primary greenhouse gas",
        description: "Carbon dioxide concentration in the atmosphere has been rising steadily since the industrial revolution, now reaching levels not seen in 800,000 years.",
        data: co2Data,
        color: "#2DD4BF",
        yAxisLabel: "CO₂ (ppm)",
        chartType: 'bar',
        dataKeys: ['value'],
        sourceUrl: "https://gml.noaa.gov/ccgg/trends/"
      },
      {
        title: "Global Sea Level",
        subtitle: "Satellite era measurements",
        description: "Sea level rise in millimeters since 1993, showing the accelerating trend caused by thermal expansion and melting ice sheets.",
        data: seaLevelData,
        color: "#0EA5E9",
        yAxisLabel: "Sea Level (mm)",
        chartType: 'area',
        dataKeys: ['value'],
        sourceUrl: "https://sealevel.nasa.gov/"
      }
    ],
    future: [
      {
        title: "Temperature Projections",
        subtitle: "Based on IPCC scenarios",
        description: "Projected global temperature rise under different emission scenarios from the Intergovernmental Panel on Climate Change (IPCC).",
        data: projectionData,
        color: "#FF5A5A",
        yAxisLabel: "Temperature (°C)",
        chartType: 'multi',
        dataKeys: ['baseline', 'lowEmission', 'highEmission'],
        sourceUrl: "https://www.ipcc.ch/report/ar6/wg1/"
      }
    ]
  };

  const allCharts = activeTab === 'historic' ? charts.historic : charts.future;

  const nextChart = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % allCharts.length);
  };

  const prevChart = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + allCharts.length) % allCharts.length);
  };

  return (
    <section id="data-charts" className="container-section" ref={sectionRef}>
      <div className="text-center mb-12">
        <div className="inline-block mb-3 px-4 py-1 rounded-full bg-ocean-500/20 backdrop-blur-sm">
          <span className="text-sm font-medium">Visual data insights</span>
        </div>
        <h2 className="text-4xl md:text-5xl mb-4 tracking-tight leading-tight" style={{ letterSpacing: '-0.025em' }}>
          Climate Data Trends
        </h2>
        <p className="max-w-2xl mx-auto text-lg opacity-80 mb-8">
          Historical measurements showing how our planet is changing over time, 
          with scientific data visualized to understand climate change impacts.
        </p>
        
        {/* Tab navigation for historic vs future data */}
        <div className="inline-flex p-1 glass rounded-full backdrop-blur-sm mb-8">
          <button 
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-colors",
              activeTab === 'historic' 
                ? "bg-ocean-600 text-white" 
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
            onClick={() => {setActiveTab('historic'); setActiveIndex(0)}}
          >
            Historical Data
          </button>
          <button 
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-colors",
              activeTab === 'future' 
                ? "bg-sunset-600 text-white" 
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
            onClick={() => {setActiveTab('future'); setActiveIndex(0)}}
          >
            Future Projections
          </button>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-ocean-900/20 to-transparent p-6 rounded-3xl backdrop-blur-sm">
        <div className="relative min-h-[550px] overflow-hidden">
          {allCharts.map((chart, index) => (
            <div 
              key={chart.title}
              className={`absolute inset-0 transition-all duration-500 ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <ChartCard 
                title={chart.title}
                subtitle={chart.subtitle}
                description={chart.description}
                data={chart.data}
                color={chart.color}
                yAxisLabel={chart.yAxisLabel}
                visible={index === activeIndex}
                chartType={chart.chartType}
                dataKeys={chart.dataKeys}
                sourceUrl={chart.sourceUrl}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={prevChart}
            className="p-3 rounded-full glass hover:bg-white/20 transition-colors"
            aria-label="Previous chart"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            {allCharts.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-10 h-2 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-ocean-500' 
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
      
      <div className="mt-12 text-center">
        <p className="text-sm opacity-70 max-w-2xl mx-auto">
          Data visualizations based on peer-reviewed research and measurements from scientific institutions worldwide.
          Future projections use IPCC climate models and scenarios.
        </p>
        <div className="mt-8">
          <a 
            href="#act-now" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-sunset-800/50 hover:bg-sunset-700/50 transition-colors text-white/90 backdrop-blur-sm"
          >
            <span>Take Action Now</span>
            <div className="ml-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowDown size={14} />
            </div>
          </a>
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

export default DataCharts;
