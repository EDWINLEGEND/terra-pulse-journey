import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme toggle
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-black/20 backdrop-blur-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-ocean-500 to-terra-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="font-bold text-xl md:text-2xl">Terra Pulse</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            <li><a href="#global-snapshot" className="hover:text-ocean-400 transition-colors">Snapshot</a></li>
            <li><a href="#data-charts" className="hover:text-ocean-400 transition-colors">Data</a></li>
            <li><a href="#act-now" className="hover:text-ocean-400 transition-colors">Act Now</a></li>
          </ul>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/40 backdrop-blur-md mt-2 p-4 mx-4 rounded-xl">
          <ul className="space-y-4">
            <li>
              <a 
                href="#global-snapshot" 
                className="block py-2 hover:text-ocean-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Snapshot
              </a>
            </li>
            <li>
              <a 
                href="#data-charts" 
                className="block py-2 hover:text-ocean-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Data
              </a>
            </li>
            <li>
              <a 
                href="#act-now" 
                className="block py-2 hover:text-ocean-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Act Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
