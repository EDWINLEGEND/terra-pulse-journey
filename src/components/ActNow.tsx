import { useState, useEffect, useRef } from 'react';
import { Mail, Share2, Award, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  delay: number;
  color?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  buttonAction, 
  delay,
  color = "from-ocean-500 to-terra-500"
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
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
      className="card-glass opacity-0 hover:translate-y-[-5px] transition-transform duration-300"
    >
      <div 
        className={cn(
          "w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center mb-4",
          color
        )}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 tracking-tight" style={{ letterSpacing: '-0.01em' }}>{title}</h3>
      <p className="mb-6 opacity-80">{description}</p>
      <button 
        onClick={buttonAction} 
        className="btn-outline w-full"
      >
        {buttonText}
      </button>
    </div>
  );
};

const ActNow: React.FC = () => {
  // Example action handlers
  const subscribeNewsletter = () => {
    console.log('Newsletter subscription requested');
    alert('Thank you for your interest! Newsletter feature coming soon.');
  };
  
  const shareContent = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'TerraTrackr',
          text: 'Check out this climate awareness experience!',
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Share functionality is coming soon!');
    }
  };
  
  const volunteerAction = () => {
    alert('Volunteer opportunities coming soon!');
  };
  
  const donateAction = () => {
    alert('Donation options coming soon!');
  };

  return (
    <section id="act-now" className="container-section">
      <div className="relative p-8 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-500/10 to-terra-500/10 rounded-3xl -z-10"></div>
        
        <div className="text-center mb-12">
          <h2 className="mb-4 tracking-tight leading-tight" style={{ letterSpacing: '-0.025em' }}>Take Action Now</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80">
            Every action matters. Join us in making a difference for our planet and future generations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard
            icon={<Mail size={24} className="text-white" />}
            title="Stay Informed"
            description="Subscribe to our newsletter for updates on climate action and sustainability tips."
            buttonText="Subscribe"
            buttonAction={subscribeNewsletter}
            delay={200}
            color="from-ocean-400 to-ocean-600"
          />
          
          <ActionCard
            icon={<Share2 size={24} className="text-white" />}
            title="Spread Awareness"
            description="Share this information with friends and family to expand our impact."
            buttonText="Share"
            buttonAction={shareContent}
            delay={400}
            color="from-terra-400 to-terra-600"
          />
          
          <ActionCard
            icon={<Award size={24} className="text-white" />}
            title="Volunteer"
            description="Join local climate initiatives and contribute your time to meaningful projects."
            buttonText="Find Opportunities"
            buttonAction={volunteerAction}
            delay={600}
            color="from-sunset-400 to-sunset-600"
          />
          
          <ActionCard
            icon={<Heart size={24} className="text-white" />}
            title="Donate"
            description="Support organizations working to combat climate change and protect ecosystems."
            buttonText="Donate"
            buttonAction={donateAction}
            delay={800}
            color="from-green-400 to-emerald-600"
          />
        </div>
      </div>
    </section>
  );
};

export default ActNow;
