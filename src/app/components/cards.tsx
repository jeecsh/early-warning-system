"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

// Component for feature cards with staggered animation
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    
    if (card) {
      // Staggered animation on scroll
      gsap.fromTo(
        card,
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          delay: delay * 0.15
        }
      );
    }
  }, [delay]);

  // 3D tilt effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const xOffset = (x - xc) / 20;
    const yOffset = (y - yc) / 20;
    
    gsap.to(card, { 
      rotationY: xOffset, 
      rotationX: -yOffset, 
      ease: "power1.out", 
      duration: 0.5,
      transformPerspective: 1000,
      transformOrigin: "center center"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, { 
      rotationY: 0, 
      rotationX: 0, 
      ease: "power3.out", 
      duration: 0.5 
    });
  };

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg p-6 transition-shadow hover:shadow-xl transform"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mb-4 text-primary-600">
        <div className="icon-wrapper w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

// Floating animation for icons
const FloatingIcon: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const icon = iconRef.current;
    
    if (icon) {
      // Create floating animation
      gsap.to(icon, {
        y: '-=10',
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  }, []);
  
  return <div ref={iconRef}>{children}</div>;
};

// Main feature section with all animations
const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    
    if (section) {
      // Animate section heading
      gsap.fromTo(
        section.querySelector('.section-heading'),
        { opacity: 0, y: -50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  // Core features from the SRS document
  const features = [
    {
      title: "Automated Analysis",
      description: "AI-powered financial stability evaluation and risk assessment reporting",
      icon: <FloatingIcon><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg></FloatingIcon>
    },
    {
      title: "Expert Review System",
      description: "Collaborative platform for financial, management and market experts",
      icon: <FloatingIcon><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg></FloatingIcon>
    },
    {
      title: "LLM-Based Reports",
      description: "Intelligent report generation using Large Language Models",
      icon: <FloatingIcon><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg></FloatingIcon>
    },
    {
      title: "Workflow Customization",
      description: "Tailor the review process to your organization's specific needs",
      icon: <FloatingIcon><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></FloatingIcon>
    },
    {
      title: "Task Automation",
      description: "Intelligent assignment of expert reviews based on availability",
      icon: <FloatingIcon><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg></FloatingIcon>
    },
    {
      title: "Interactive Dashboard",
      description: "Visual analytics and insights for better decision-making",
      icon: <FloatingIcon><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg></FloatingIcon>
    },
  ];

  return (
    <div ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-3xl font-bold text-center mb-12">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Gradient button with hover effect
const GradientButton: React.FC<{text: string}> = ({ text }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05, 
          duration: 0.3,
          ease: "power1.out",
          background: "linear-gradient(45deg, #4f46e5, #7c3aed)"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1, 
          duration: 0.3,
          ease: "power1.out",
          background: "linear-gradient(45deg, #3b82f6, #4f46e5)"
        });
      });
    }
    
    return () => {
      if (button) {
        button.removeEventListener('mouseenter', () => {});
        button.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);
  
  return (
    <button 
      ref={buttonRef}
      className="px-6 py-3 rounded-md text-white font-semibold shadow-lg transition-all"
      style={{ background: "linear-gradient(45deg, #3b82f6, #4f46e5)" }}
    >
      {text}
    </button>
  );
};

// Export the components for use in your application
export { FeaturesSection, FeatureCard, FloatingIcon, GradientButton };