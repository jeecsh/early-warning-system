"use client";

import { useRef, MutableRefObject } from 'react';
import ModelViewer from './components/ModelViewer';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const HeroSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!circleRef.current || !container.current) return;
    
    // Circular background animation
    gsap.to(circleRef.current, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center'
    });
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-white relative overflow-hidden">
      {/* Circular Background Animation */}
      <div 
        ref={circleRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div className="w-[500px] h-[500px] border-4 border-dashed border-blue-200 rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EWS
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Product', 'Solutions', 'Resources', 'Company'].map((item) => (
                <button key={item} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  {item}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium">
                Sign In
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10 relative">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Transform Financial
              <br />
              <span className="text-blue-600">Risk Management</span>
            </h1>
            
            <p className="text-lg text-gray-600">
              AI-powered insights combined with expert analysis for proactive
              business health monitoring and strategic decision-making.
            </p>

            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
              Start Free Analysis
            </button>
          </div>

                    {/* 3D Model Viewer */}
          <div className="relative h-[500px] flex items-center justify-center">
            <ModelViewer />
          </div>
        </div>
      </div>

      {/* Next Section */}
      <div ref={nextSectionRef} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Next Section</h2>
          <p className="text-lg text-gray-600">This is the next section where the divs will move to.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
