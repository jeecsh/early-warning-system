"use client";

import { useRef, useState } from 'react';
import ModelViewer from './ModelViewer';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LandingPageNavbar } from './landingPageNavbar';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const HeroSection = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [modelRotation, setModelRotation] = useState(0);

  useGSAP(() => {
    if (!circleRef.current || !container.current) return;
    
    gsap.to(circleRef.current, {
      rotation: (modelRotation * 180) / Math.PI,
      duration: 0.3,
      ease: "none",
    });
  }, [modelRotation]);

  const handleRotationChange = (rotation: number) => {
    setModelRotation(rotation);
  };

  return (
    <div ref={container} className="min-h-screen bg-white relative overflow-hidden">
      {/* Circular Background Animation */}
      <div 
        ref={circleRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] border-4 border-dashed border-blue-200 rounded-full" />
      </div>

      <LandingPageNavbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 z-10 relative text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight flex flex-col">
              <span>Transform Financial</span>
              <span className="text-blue-600">Risk Management</span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              AI-powered insights combined with expert analysis for proactive
              business health monitoring and strategic decision-making.
            </p>

            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base">
              Start Free Analysis
            </button>
          </div>

          {/* 3D Model Viewer */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center mt-8 lg:mt-0">
            <ModelViewer onRotationChange={handleRotationChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
