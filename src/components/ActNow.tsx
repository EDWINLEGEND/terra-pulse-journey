import { useState, useEffect, useRef } from 'react';
import { Mail, Share2, Award, Heart, Clipboard, HeartHandshake, DollarSign, Check, AlertTriangle, ExternalLink, ChevronRight, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  delay: number;
  color?: string;
  actionType: 'subscribe' | 'share' | 'volunteer' | 'donate';
  implementationStatus: 'ready' | 'coming-soon';
}

interface TestimonialProps {
  quote: string;
  name: string;
  location: string;
  avatar?: string;
  actionType: 'subscribe' | 'share' | 'volunteer' | 'donate';
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, location, avatar, actionType }) => {
  const colorMap = {
    subscribe: 'from-sky-400/20 to-sky-900/5',
    share: 'from-teal-400/20 to-teal-900/5',
    volunteer: 'from-amber-400/20 to-amber-900/5',
    donate: 'from-rose-400/20 to-rose-900/5',
  };

  return (
    <div className={`relative p-4 rounded-xl bg-gradient-to-tr ${colorMap[actionType]} backdrop-blur-sm`}>
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M28.1334 38.6667C28.1334 30.9361 34.4028 24.6667 42.1334 24.6667H43.8667C51.5974 24.6667 57.8667 30.9361 57.8667 38.6667V40.4C57.8667 48.1307 51.5974 54.4 43.8667 54.4H42.1334C34.4028 54.4 28.1334 48.1307 28.1334 40.4V38.6667Z" fill="white"/>
          <path d="M61.7334 38.6667C61.7334 30.9361 68.0028 24.6667 75.7334 24.6667H77.4667C85.1974 24.6667 91.4667 30.9361 91.4667 38.6667V40.4C91.4667 48.1307 85.1974 54.4 77.4667 54.4H75.7334C68.0028 54.4 61.7334 48.1307 61.7334 40.4V38.6667Z" fill="white"/>
        </svg>
      </div>
      <p className="italic text-sm text-white/90">{quote}</p>
      <div className="flex items-center mt-3">
        <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden flex items-center justify-center text-white">
          {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : <User size={14} />}
        </div>
        <div className="ml-2">
          <p className="text-xs font-medium">{name}</p>
          <p className="text-xs opacity-70">{location}</p>
        </div>
      </div>
    </div>
  );
};

const ActionCard: React.FC<ActionCardProps> = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  buttonAction, 
  delay,
  color = "from-ocean-500 to-terra-500",
  actionType,
  implementationStatus 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const colorMap = {
    subscribe: 'from-sky-800/50 to-sky-600/30 hover:from-sky-700/60 hover:to-sky-500/40 border-sky-500/30',
    share: 'from-teal-800/50 to-teal-600/30 hover:from-teal-700/60 hover:to-teal-500/40 border-teal-500/30',
    volunteer: 'from-amber-800/50 to-amber-600/30 hover:from-amber-700/60 hover:to-amber-500/40 border-amber-500/30',
    donate: 'from-rose-800/50 to-rose-600/30 hover:from-rose-700/60 hover:to-rose-500/40 border-rose-500/30',
  };

  const glowMap = {
    subscribe: 'shadow-sky-500/20',
    share: 'shadow-teal-500/20',
    volunteer: 'shadow-amber-500/20',
    donate: 'shadow-rose-500/20',
  };

  const handleAction = () => {
    setIsAnimating(true);
    buttonAction();
    setTimeout(() => setIsAnimating(false), 1000);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            cardRef.current?.classList.add('animate-fade-in-up');
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={cn(
        `relative p-6 rounded-2xl backdrop-blur-sm opacity-0 translate-y-8
        transition-all duration-300 ease-out border overflow-hidden
        bg-gradient-to-br ${colorMap[actionType]} ${isHovered ? glowMap[actionType] : ''}`,
        isHovered && 'shadow-lg'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-100px] right-[-80px] w-[200px] h-[200px] rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-[-30px] left-[-50px] w-[120px] h-[120px] rounded-full bg-white/5 blur-xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between mb-3">
          <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-white/10 text-white">
            {icon}
          </div>
          
          {implementationStatus === 'coming-soon' && (
            <button 
              onMouseEnter={() => setShowStatus(true)}
              onMouseLeave={() => setShowStatus(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <AlertTriangle size={18} />
              {showStatus && (
                <div className="absolute top-0 right-0 mt-10 glass p-2 rounded-lg text-xs text-white/90 backdrop-blur-md animate-fade-in">
                  Coming soon
                  <div className="absolute top-[-6px] right-2 w-3 h-3 glass rotate-45"></div>
                </div>
              )}
            </button>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2 tracking-tight text-white" style={{ letterSpacing: '-0.025em' }}>
          {title}
        </h3>
        
        <p className="mb-6 text-white/80">{description}</p>
        
        <button 
          onClick={handleAction}
          className={cn(
            "w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all",
            isAnimating ? "animate-pulse" : "",
            implementationStatus === 'ready' 
              ? "bg-white text-slate-900 hover:bg-white/90" 
              : "bg-white/20 text-white hover:bg-white/30"
          )}
        >
          {isAnimating ? <Check size={18} /> : buttonText}
          <ChevronRight size={16} className={cn("transition-transform", isHovered ? "translate-x-1" : "")} />
        </button>
      </div>
    </div>
  );
};

const testimonials: TestimonialProps[] = [
  {
    quote: "The newsletter keeps me informed with actionable climate insights every week.",
    name: "Sarah Johnson",
    location: "New York, USA",
    actionType: 'subscribe'
  },
  {
    quote: "I've educated so many friends using the graphs and data from this site.",
    name: "Miguel Diaz",
    location: "Barcelona, Spain",
    actionType: 'share'
  },
  {
    quote: "Volunteering with local initiatives helped me feel like I'm making a difference.",
    name: "Tanisha Patel",
    location: "London, UK",
    actionType: 'volunteer'
  },
  {
    quote: "Contributing to climate action projects gives me hope for our future.",
    name: "James Wilson",
    location: "Sydney, Australia",
    actionType: 'donate'
  }
];

const ActNow: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Terra Pulse Journey',
        text: 'Check out this climate change tracker for real-time data and insights!',
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link copied to clipboard! Share it with others to spread awareness."))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };
  
  const handleVolunteer = () => {
    alert("Volunteering opportunities are coming soon. We'll connect you with local climate action groups!");
  };
  
  const handleDonate = () => {
    alert("Donation functionality is coming soon. Your contributions will support climate action initiatives!");
  };

  return (
    <section id="act-now" className="container-section" ref={sectionRef}>
      <div className="relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] top-0 left-1/2 -translate-x-1/2 bg-sunset-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute w-[300px] h-[300px] bottom-0 left-[10%] bg-ocean-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative">
          <div className="text-center mb-10">
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-sunset-500/20 backdrop-blur-sm">
              <span className="text-sm font-medium">Be part of the solution</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight leading-tight" style={{ letterSpacing: '-0.025em' }}>
              Take Action Now
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              Everyone can contribute to climate action. Choose how you want to make a difference today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-6">
              <ActionCard
                icon={<Clipboard size={24} />}
                title="Stay Informed"
                description="Subscribe to our newsletter for the latest climate updates and actionable insights."
                buttonText="Subscribe"
                buttonAction={handleSubscribe}
                delay={200}
                color="from-ocean-400 to-ocean-600"
                actionType="subscribe"
                implementationStatus="ready"
              />
              
              <div className="p-4 backdrop-blur-sm bg-white/5 rounded-xl">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubscribe();
                  }}
                  className="flex flex-col gap-3"
                >
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-ocean-500 focus:outline-none placeholder:text-white/40"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all",
                      isSubmitting || isSuccess 
                        ? "bg-ocean-600 text-white" 
                        : "bg-white text-slate-900 hover:bg-white/90"
                    )}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : isSuccess ? (
                      <>
                        <Check size={18} />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Get Updates</span>
                      </>
                    )}
                  </button>
                </form>
                <p className="text-xs text-white/60 mt-3">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
              
              <Testimonial {...testimonials[0]} />
            </div>
            
            <div className="space-y-6">
              <ActionCard
                icon={<Share2 size={24} />}
                title="Spread Awareness"
                description="Share this knowledge with others. Informed communities drive bigger impact."
                buttonText="Share Now"
                buttonAction={handleShare}
                delay={400}
                color="from-terra-400 to-terra-600"
                actionType="share"
                implementationStatus="ready"
              />
              
              <div className="p-4 backdrop-blur-sm bg-white/5 rounded-xl">
                <h4 className="font-medium mb-3">Why sharing matters:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <Check size={12} className="text-teal-300" />
                    </div>
                    <span className="text-sm text-white/80">Raises awareness about climate crisis</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <Check size={12} className="text-teal-300" />
                    </div>
                    <span className="text-sm text-white/80">Encourages others to take action</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <Check size={12} className="text-teal-300" />
                    </div>
                    <span className="text-sm text-white/80">Helps combat misinformation</span>
                  </li>
                </ul>
              </div>
              
              <Testimonial {...testimonials[1]} />
            </div>
            
            <div className="space-y-6">
              <ActionCard
                icon={<HeartHandshake size={24} />}
                title="Volunteer"
                description="Join local climate initiatives or participate in online community actions."
                buttonText="Join Us"
                buttonAction={handleVolunteer}
                delay={600}
                color="from-sunset-400 to-sunset-600"
                actionType="volunteer"
                implementationStatus="coming-soon"
              />
              
              <div className="p-4 backdrop-blur-sm bg-white/5 rounded-xl">
                <h4 className="font-medium mb-3">How you can help:</h4>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-2 rounded bg-white/10 hover:bg-white/15 transition-colors group">
                    <span className="text-sm">Tree Planting Initiatives</span>
                    <ExternalLink size={14} className="text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 rounded bg-white/10 hover:bg-white/15 transition-colors group">
                    <span className="text-sm">Beach & River Cleanups</span>
                    <ExternalLink size={14} className="text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 rounded bg-white/10 hover:bg-white/15 transition-colors group">
                    <span className="text-sm">Digital Advocacy</span>
                    <ExternalLink size={14} className="text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
                <p className="text-xs text-white/60 mt-3">
                  Coming soon: Connect with local groups in your area
                </p>
              </div>
              
              <Testimonial {...testimonials[2]} />
            </div>
            
            <div className="space-y-6">
              <ActionCard
                icon={<DollarSign size={24} />}
                title="Support Solutions"
                description="Donate to climate action projects and sustainable technology research."
                buttonText="Donate"
                buttonAction={handleDonate}
                delay={800}
                color="from-green-400 to-emerald-600"
                actionType="donate"
                implementationStatus="coming-soon"
              />
              
              <div className="p-4 backdrop-blur-sm bg-white/5 rounded-xl">
                <h4 className="font-medium mb-3">Your contribution supports:</h4>
                <div className="space-y-2">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/70">Renewable Energy</span>
                      <span className="text-xs text-white/70">65%</span>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-white/10">
                      <div className="bg-rose-500/50 w-[65%] rounded"></div>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/70">Reforestation</span>
                      <span className="text-xs text-white/70">25%</span>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-white/10">
                      <div className="bg-rose-500/50 w-[25%] rounded"></div>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/70">Education</span>
                      <span className="text-xs text-white/70">10%</span>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-white/10">
                      <div className="bg-rose-500/50 w-[10%] rounded"></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-3">
                  Coming soon: Transparent tracking of your impact
                </p>
              </div>
              
              <Testimonial {...testimonials[3]} />
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-block p-4 rounded-xl glass backdrop-blur-sm max-w-2xl">
              <p className="font-medium text-lg mb-2">Every action counts</p>
              <p className="text-white/80">
                Climate change requires collective action. Whether you donate, volunteer, 
                or simply stay informed and share knowledge, you're part of the solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActNow;
