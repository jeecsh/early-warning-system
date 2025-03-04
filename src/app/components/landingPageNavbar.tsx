  "use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LandingPageNavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const LandingPageNavbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }: LandingPageNavbarProps) => {
  const menuItems = ['Product', 'Solutions', 'Resources', 'Company'];
  const gradientRef = useRef(null); // Ref for the gradient animation
  const ball1Ref = useRef(null); // Ref for the first moving ball
  const ball2Ref = useRef(null); // Ref for the second moving ball

  // GSAP animation for the gradient and balls
  useEffect(() => {
    if (!gradientRef.current || !ball1Ref.current || !ball2Ref.current) return; // Ensure refs are set

    // Gradient animation
    gsap.fromTo(gradientRef.current,
      { backgroundPosition: '0% 50%' },
      {
        backgroundPosition: '200% 50%',
        duration: 8,
        repeat: -1,
        ease: "none"
      }
    );

    // Infinite motion for the balls
    gsap.to(ball1Ref.current, {
      x: 20, // Move horizontally
      y: -20, // Move vertically
      duration: 2,
      repeat: -1, // Infinite loop
      yoyo: true, // Go back and forth
      ease: "power2.inOut",
    });

    gsap.to(ball2Ref.current, {
      x: -20, // Move horizontally
      y: 20, // Move vertically
      duration: 2,
      repeat: -1, // Infinite loop
      yoyo: true, // Go back and forth
      ease: "power2.inOut",
    });

    // Optional: Add rotation to the balls for more dynamic motion
    gsap.to([ball1Ref.current, ball2Ref.current], {
      rotation: 360, // Rotate the balls
      duration: 4,
      repeat: -1, // Infinite loop
      ease: "linear",
    });
  }, []);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Area */}
          <div className="flex items-center space-x-2">
            {/* Logo with Gradient Animation */}
            <div className="relative">
              {/* Moving Balls */}
              <div
                ref={ball1Ref}
                className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-50 -z-10"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              />
              <div
                ref={ball2Ref}
                className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-50 -z-10"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              />
              <div
                ref={gradientRef}
                className="text-xl sm:text-2xl font-bold relative z-0 isolate"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-white to-blue-600 bg-[length:200%_100%] bg-clip-text text-transparent pointer-events-none"
                  style={{ 
                    backgroundPosition: '0% 50%',
                    backgroundSize: '200% 100%',
                    backgroundRepeat: 'no-repeat',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'block',
                    width: '100%'
                  }}
                >
                  EWS
                </span>
                <span aria-hidden="true" className="select-none invisible">
                  EWS
                </span>
              </div>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button key={item} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {item}
              </button>
            ))}
          </div>
          
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Sign In
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-2 space-y-1">
          {menuItems.map((item) => (
            <button key={item} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
              {item}
            </button>
          ))}
          <div className="border-t pt-2 space-y-2">
            <button className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 font-medium">
              Sign In
            </button>
            <button className="block w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
