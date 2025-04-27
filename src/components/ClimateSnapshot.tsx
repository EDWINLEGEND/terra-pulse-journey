import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ThermometerSun, 
  Droplets, 
  Wind, 
  TreePine, 
  Waves, 
  Cloud, 
  AlertTriangle, 
  Info,
  LucideIcon,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Maximize,
  Minimize,
  ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Interface for climate metrics data
interface ClimateMetric {
  id: string;
  title: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  impact: 'negative' | 'positive' | 'neutral';
  icon: LucideIcon;
  color: string;
  description: string;
  source: string;
  sourceUrl: string;
  details: {
    current: string;
    historical: string;
    projection: string;
    actions: string[];
  };
}

// Component for data source information with interactive tooltip
const DataSourceInfo: React.FC<{ source: string; url: string }> = ({ source, url }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative inline-block">
      <button
        className="text-white/40 hover:text-white/80 transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => window.open(url, '_blank')}
      >
        <Info size={14} />
      </button>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-48 mb-2 p-2 text-xs bg-black/80 backdrop-blur-md border border-white/10 rounded-lg z-20"
          >
            <div className="flex justify-between items-center">
              <span>Data Source:</span>
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ocean-400 hover:text-ocean-300 flex items-center gap-1"
              >
                {source} <ExternalLink size={10} />
              </a>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black/80 border-r border-b border-white/10"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Detailed metric card component with expandable details
const MetricCard: React.FC<{ metric: ClimateMetric }> = ({ metric }) => {
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  
  const Icon = metric.icon;
  const trendIconClass = metric.trend === 'up' ? 'rotate-0' : 'rotate-180';
  const impactClass = 
    metric.impact === 'negative' ? 'text-sunset-500' : 
    metric.impact === 'positive' ? 'text-green-500' : 
    'text-white/80';
    
  return (
    <motion.div 
      layout
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10",
        "bg-gradient-to-br backdrop-blur-md transition-all duration-300",
        "from-black/60 to-black/40",
        fullscreen ? "fixed inset-4 z-50" : "w-full"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${metric.color}`}></div>
        <div className="absolute -left-10 -top-10 w-40 h-40 blur-3xl opacity-10 rounded-full bg-white"></div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 blur-3xl opacity-5 rounded-full bg-white"></div>
      </div>
      
      <div className="relative z-10 p-4">
        {/* Header with title, value and controls */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-white/5 ${expanded ? 'bg-white/10' : ''}`}>
              <Icon size={18} className={metric.color.replace('from-', 'text-').split(' ')[0]} />
            </div>
            <h3 className="font-medium text-lg">{metric.title}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <DataSourceInfo source={metric.source} url={metric.sourceUrl} />
            <button 
              onClick={() => setFullscreen(!fullscreen)}
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              {fullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            </button>
          </div>
        </div>
        
        {/* Metric value and trend */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-3xl font-bold">{metric.value}</span>
          <span className="text-sm text-white/60">{metric.unit}</span>
          <div className={`ml-3 flex items-center gap-1 ${impactClass}`}>
            <ChevronUp className={trendIconClass} size={16} />
            <span className="text-sm">{metric.change}</span>
          </div>
        </div>
        
        <p className="text-sm text-white/70 mb-3">{metric.description}</p>
        
        {/* Expandable details section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-white/10">
                <div className="mb-3">
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-1">Current Status</h4>
                  <p className="text-sm">{metric.details.current}</p>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-1">Historical Context</h4>
                  <p className="text-sm">{metric.details.historical}</p>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-1">Future Projection</h4>
                  <p className="text-sm">{metric.details.projection}</p>
                </div>
                
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-1">Actions We Can Take</h4>
                  <ul className="text-sm list-disc list-inside">
                    {metric.details.actions.map((action, i) => (
                      <li key={i} className="mb-1">{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Toggle details button */}
        <button
          className="flex items-center gap-1 mt-2 text-sm text-ocean-400 hover:text-ocean-300 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show details'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </motion.div>
  );
};

const ClimateSnapshot: React.FC = () => {
  // Climate metrics data
  const metrics: ClimateMetric[] = [
    {
      id: 'temperature',
      title: 'Global Temperature',
      value: '1.1',
      unit: '°C',
      change: '+0.18°C per decade',
      trend: 'up',
      impact: 'negative',
      icon: ThermometerSun,
      color: 'from-sunset-800 to-sunset-600',
      description: 'Average global temperature increase since pre-industrial era (1850-1900)',
      source: 'IPCC',
      sourceUrl: 'https://www.ipcc.ch/report/ar6/wg1/',
      details: {
        current: 'Current warming is approximately 1.1°C above pre-industrial levels, with noticeable impacts on weather patterns and ecosystems.',
        historical: 'Earth\'s temperature has been relatively stable for 10,000 years until the industrial revolution. The rate of warming has more than doubled in the last 40 years.',
        projection: 'Without significant reductions in emissions, we are likely to reach 1.5°C between 2030 and 2052, with severe consequences for ecosystems and human systems.',
        actions: [
          'Transition to renewable energy sources',
          'Improve energy efficiency in buildings and transportation',
          'Support policies for rapid decarbonization'
        ]
      }
    },
    {
      id: 'co2',
      title: 'CO₂ Concentration',
      value: '417',
      unit: 'ppm',
      change: '+2.5 ppm annually',
      trend: 'up',
      impact: 'negative',
      icon: Cloud,
      color: 'from-terra-800 to-terra-600',
      description: 'Atmospheric carbon dioxide concentration, the primary greenhouse gas driver of warming',
      source: 'NOAA',
      sourceUrl: 'https://gml.noaa.gov/ccgg/trends/',
      details: {
        current: 'Current CO₂ levels of ~417 ppm are the highest in at least 800,000 years, and likely in over 3 million years.',
        historical: 'Pre-industrial levels were around 280 ppm. CO₂ concentrations have increased by 48% since then, primarily due to fossil fuel burning.',
        projection: 'Under current policies, CO₂ levels could reach 500-600 ppm by 2100, leading to warming of 3°C or more.',
        actions: [
          'Reduce fossil fuel consumption',
          'Protect and restore carbon sinks like forests',
          'Develop and deploy carbon capture technologies'
        ]
      }
    },
    {
      id: 'sea-level',
      title: 'Sea Level Rise',
      value: '3.7',
      unit: 'mm/yr',
      change: 'Rate doubled since 1993',
      trend: 'up',
      impact: 'negative',
      icon: Waves,
      color: 'from-ocean-800 to-ocean-600',
      description: 'Annual rate of global sea level rise, threatening coastal communities worldwide',
      source: 'NASA',
      sourceUrl: 'https://sealevel.nasa.gov/',
      details: {
        current: 'Sea levels are rising at an average rate of 3.7 mm per year globally, with acceleration in recent decades.',
        historical: 'Global sea level rose by about 20 cm in the 20th century. The rate of rise since the mid-19th century has been larger than the mean rate during the previous two millennia.',
        projection: 'Sea levels are projected to rise by 0.3-1.1 meters by 2100, with some estimates exceeding 2 meters in worst-case scenarios.',
        actions: [
          'Protect and restore coastal wetlands as natural buffers',
          'Develop resilient coastal infrastructure',
          'Plan managed retreat from highly vulnerable areas'
        ]
      }
    },
    {
      id: 'arctic-ice',
      title: 'Arctic Sea Ice',
      value: '13',
      unit: '% decline per decade',
      change: 'Since 1979',
      trend: 'down',
      impact: 'negative',
      icon: Wind,
      color: 'from-sky-800 to-sky-600',
      description: 'Rate of decline in Arctic sea ice extent, impacting global climate patterns',
      source: 'NSIDC',
      sourceUrl: 'https://nsidc.org/arcticseaicenews/',
      details: {
        current: 'Arctic sea ice extent has been declining at a rate of about 13% per decade relative to the 1981-2010 average.',
        historical: 'The Arctic is warming at more than twice the rate of the global average, leading to dramatic reductions in sea ice.',
        projection: 'The Arctic could experience ice-free summers as early as 2035, amplifying regional warming and disrupting ocean currents.',
        actions: [
          'Reduce black carbon emissions that accelerate ice melt',
          'Protect Arctic ecosystems and Indigenous communities',
          'Limit global warming to minimize further ice loss'
        ]
      }
    },
    {
      id: 'ocean-acidification',
      title: 'Ocean Acidification',
      value: '30',
      unit: '% increase',
      change: 'Since pre-industrial era',
      trend: 'up',
      impact: 'negative',
      icon: Droplets,
      color: 'from-blue-800 to-blue-600',
      description: 'Increase in ocean acidity since pre-industrial times, threatening marine ecosystems',
      source: 'NOAA',
      sourceUrl: 'https://www.pmel.noaa.gov/co2/story/Ocean+Acidification',
      details: {
        current: 'Ocean acidity has increased by about 30% since the beginning of the Industrial Revolution due to absorption of atmospheric CO₂.',
        historical: 'The ocean has absorbed approximately 30% of the CO₂ produced by human activities, changing its chemistry at an unprecedented rate.',
        projection: 'By 2100, ocean acidity could increase by 150%, severely impacting marine organisms with calcium carbonate shells and skeletons.',
        actions: [
          'Reduce carbon emissions to slow acidification',
          'Protect vulnerable marine ecosystems',
          'Support research on acidification-resistant coral and shellfish species'
        ]
      }
    },
    {
      id: 'forest-cover',
      title: 'Forest Cover',
      value: '10',
      unit: 'million ha/yr',
      change: 'Loss rate 2015-2020',
      trend: 'down',
      impact: 'negative',
      icon: TreePine,
      color: 'from-green-800 to-green-600',
      description: 'Annual rate of global forest loss, impacting biodiversity and carbon sequestration',
      source: 'FAO',
      sourceUrl: 'https://www.fao.org/forest-resources-assessment/',
      details: {
        current: 'Approximately 10 million hectares of forest are lost annually, though the rate has slowed compared to previous decades.',
        historical: 'About 420 million hectares of forest have been lost since 1990, mainly due to agricultural expansion.',
        projection: 'Without significant policy changes, continued deforestation will accelerate biodiversity loss and climate change.',
        actions: [
          'Support sustainable forestry practices',
          'Restore degraded forest landscapes',
          'Reduce consumption of products driving deforestation'
        ]
      }
    }
  ];

  return (
    <section id="climate-snapshot" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black -z-10"></div>
      <div className="absolute inset-0 opacity-30 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-ocean-800/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-sunset-800/20 blur-[100px] rounded-full"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <AlertTriangle size={14} className="text-yellow-400" />
            <span className="text-sm font-medium">Critical Climate Indicators</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Global Climate Snapshot</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Key metrics showing the current state of our planet's climate system, 
            based on the latest scientific data and measurements.
          </p>
        </motion.div>
        
        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div 
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a 
            href="#data-trends" 
            className="inline-flex items-center gap-2 py-2 px-4 text-ocean-400 hover:text-ocean-300 transition-colors"
          >
            <span>Explore Historical Trends</span>
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ClimateSnapshot; 