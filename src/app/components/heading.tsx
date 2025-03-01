'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinancialWarning() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current && lightRef.current && subTextRef.current) {
      const chars = textRef.current.textContent?.split('') || [];
      textRef.current.innerHTML = chars.map((char) => `<span class='inline-block opacity-0 px-1'>${char}</span>`).join('');
      const spans = textRef.current.querySelectorAll('span');

      gsap.fromTo(
        spans,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.to(lightRef.current, {
        x: '100vw',
        y: '50vh',
        scale: 3,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });

      gsap.fromTo(
        subTextRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          delay: chars.length * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subTextRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-center py-40 px-5 bg-white min-h-screen overflow-hidden">
      <div ref={lightRef} className="absolute top-0 left-0 w-40 h-40 bg-blue-300 opacity-40 blur-3xl rounded-full" />
      <div className="relative inline-block">
        <h1 ref={textRef} className="text-3xl md:text-6xl font-bold text-blue-600 relative">
          Your  Financial  Early  Warning  System
        </h1>
      </div>
      <p ref={subTextRef} className="mt-6 text-lg md:text-2xl text-blue-500 opacity-0"> 
        Detect risks early, take action faster, and secure your business's future.
      </p>
    </div>
  );
}
    