import { Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-md py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Terra Pulse</h3>
            <p className="text-white/70 mb-4">
              Tracking climate change metrics and empowering action through data visualization.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#global-snapshot" className="text-white/70 hover:text-white transition-colors">Global Snapshot</a></li>
              <li><a href="#data-charts" className="text-white/70 hover:text-white transition-colors">Data Trends</a></li>
              <li><a href="#act-now" className="text-white/70 hover:text-white transition-colors">Take Action</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://www.ipcc.ch/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">IPCC</a></li>
              <li><a href="https://climate.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">NASA Climate</a></li>
              <li><a href="https://www.noaa.gov/climate" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">NOAA Climate</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          <p className="flex items-center justify-center">
            Created with <Heart size={14} className="mx-1 text-sunset-500" /> for a sustainable future
          </p>
          <p className="mt-1">© {new Date().getFullYear()} Terra Pulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
