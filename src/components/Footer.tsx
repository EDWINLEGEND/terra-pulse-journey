
import { Github, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ocean-900/30 backdrop-blur-sm py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-ocean-500 to-terra-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-heading font-bold text-lg">TerraTrackr</span>
            </div>
            <p className="text-sm opacity-70 mb-4">
              Educating and inspiring action on climate change through data visualization and storytelling.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-ocean-400 transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-ocean-400 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-ocean-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="hover:text-ocean-400 transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Climate Reports</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Research Papers</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Educational Tools</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Data Sources</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm opacity-70">info@terratrackr.example</li>
              <li className="text-sm opacity-70">+1 (555) 123-4567</li>
              <li className="text-sm opacity-70">123 Earth Avenue, Global City</li>
            </ul>
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-50 mb-4 md:mb-0">
            © {new Date().getFullYear()} TerraTrackr. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs opacity-50 hover:opacity-80 transition-opacity">Privacy Policy</a>
            <a href="#" className="text-xs opacity-50 hover:opacity-80 transition-opacity">Terms of Service</a>
            <a href="#" className="text-xs opacity-50 hover:opacity-80 transition-opacity">Cookies</a>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-xs opacity-50">
            Data sourced from NASA, NOAA, and other scientific organizations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
