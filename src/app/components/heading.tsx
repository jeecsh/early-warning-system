'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinancialWarning() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const dataStreamRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (textRef.current && lightRef.current && subTextRef.current) {
      const chars = textRef.current.textContent?.split('') || [];
      textRef.current.innerHTML = chars.map((char) => `<span class='inline-block opacity-0 px-[0.1rem]'>${char}</span>`).join('');
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

    if (dataStreamRef.current && nextSectionRef.current) {
      gsap.fromTo(
        dataStreamRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dataStreamRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        nextSectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: nextSectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Synchronized bouncing and falling animation for balls
    if (dataStreamRef.current) {
      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" }
      });

      // Initial synchronized bouncing animation
      tl.fromTo(ballsRef.current,
        { y: 0 },
        { 
          y: -20,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          stagger: 0
        }
      );

      // Scroll-triggered falling animation with disappearing effect
      ballsRef.current.forEach((ball, index) => {
        gsap.to(ball, {
          y: '100vh',
          duration: 1.5,
          delay: index * 0.1,
          ease: "power2.in",
          scrollTrigger: {
            trigger: dataStreamRef.current,
            start: "top center",
            toggleActions: "play none none none"
          },
          onStart: () => {
            if (index === 0) {
              // Stop bouncing animation when first ball starts falling
              tl.kill();
            }
          },
          onComplete: () => {
            if (ball) {
              gsap.set(ball, { display: 'none' });
            }
          }
        });
      });
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-center py-40 px-5 bg-white min-h-screen overflow-hidden">
      <div ref={lightRef} className="absolute top-0 left-0 w-40 h-40 bg-blue-300 opacity-40 blur-3xl rounded-full" />
      <div className="relative inline-block">
        <h1 ref={textRef} className="text-3xl md:text-6xl font-bold text-blue-600 relative">
          Your Financial Early Warning System
        </h1>
      </div>
      <p ref={subTextRef} className="mt-6 text-lg md:text-2xl text-blue-500 opacity-0"> 
        Detect risks early, take action faster, and secure your business&apos;s future.
      </p>
      
      {/* Transition Effect - Flowing Data Visualization */}
      <div ref={dataStreamRef} className="mt-24 flex flex-wrap justify-center gap-2 opacity-0">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) => {
              if (ballsRef.current) {
                ballsRef.current[index] = el;
              }
            }}
            className="w-8 h-8 bg-blue-400 rounded-full"
          ></div>
        ))}
      </div>
      
      <div ref={nextSectionRef} className="mt-16 opacity-0">
        <h2 className="text-3xl md:text-6xl font-bold text-blue-600">
          Unlock Growth with Strategic Insights
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-blue-500">
          Leverage data-driven decisions to stay ahead in an ever-changing market.
        </p>
      </div>
    </div>
  );
}
