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
  const nextTextRef = useRef<HTMLHeadingElement>(null);
  const ballsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const animateText = (element: HTMLElement | null, delay = 0, startPosition = "85%") => {
      if (element) {
        const words = element.textContent?.split(" ") || [];
        element.innerHTML = words
          .map((word) => `<span class='inline-block opacity-0 px-1'>${word}</span>`)
          .join(" ");

        const spans = element.querySelectorAll("span");

        gsap.fromTo(
          spans,
          { opacity: 0, y: 20, x: -10 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            stagger: 0.25, // Increased stagger time
            ease: "power2.out", // Smoother easing
            duration: 2, // Increased duration
            delay,
            scrollTrigger: {
              trigger: element,
              start: `top ${startPosition}`,
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    };

    // Animate first header
    animateText(textRef.current, 0, "85%");

    // Animate second header with different timing
    animateText(nextTextRef.current, 0.5, "65%"); // Increased delay between headers

    // Light animation
    gsap.to(lightRef.current, {
      x: '100vw',
      y: '75vh',
      scale: 5,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    // Animate subText
    if (subTextRef.current) {
      gsap.fromTo(
        subTextRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          delay: 2, // Increased delay to match slower header animation
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subTextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Balls animation
    if (dataStreamRef.current) {
      // Initial setup
      gsap.set(dataStreamRef.current, { opacity: 1 });
      gsap.set(ballsRef.current, { y: 0 });

      // Wave animation
      const waveAnimation = gsap.to(ballsRef.current, {
        y: -20,
        duration: 1,
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        },
        paused: true
      });

      // Start wave animation immediately
      waveAnimation.play();

      // Create scroll trigger for falling
      ScrollTrigger.create({
        trigger: nextSectionRef.current,
        start: "top 65%",
        onEnter: () => {
          // Stop wave animation
          waveAnimation.pause();

          // Start falling animation
          ballsRef.current.forEach((ball, index) => {
            if (ball) {
              gsap.to(ball, {
                y: window.innerHeight,
                x: Math.random() * 200 - 100,
                rotation: Math.random() * 360,
                duration: 1.5,
                delay: index * 0.1,
                ease: "power1.in",
                onComplete: () => {
                  if (ball) {
                    ball.style.display = 'none';
                  }
                }
              });
            }
          });
        }
      });
    }

    // Next section animation
    if (nextSectionRef.current) {
      gsap.set(nextSectionRef.current, { opacity: 1 });
      gsap.fromTo(
        nextSectionRef.current,
        { y: 50 },
        {
          y: 0,
          duration: 2, // Increased duration
          ease: 'power2.out',
          scrollTrigger: {
            trigger: nextSectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-center py-40 px-5 bg-white min-h-screen overflow-hidden">
      <div ref={lightRef} className="absolute top-1/4 left-0 w-40 h-40 bg-blue-300 opacity-40 blur-3xl rounded-full" />

      <div className="relative inline-block mb-32">
        <h1 
          ref={textRef} 
          className="text-4xl sm:text-4xl md:text-6xl font-bold text-blue-600 leading-tight 
                    max-w-[90%] sm:max-w-[600px] mx-auto tracking-tight px-2 md:px-4 
                    break-words whitespace-normal w-full"
        >
          Your Financial Early Warning System
        </h1>

        <p ref={subTextRef} className="mt-6 text-lg md:text-2xl text-blue-500"> 
          Detect risks early, take action faster, and secure your business&apos;s future.
        </p>
      </div>

      <div ref={dataStreamRef} className="mt-24 flex flex-wrap justify-center gap-2 w-full max-w-2xl">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (ballsRef.current) {
                ballsRef.current[index] = el;
              }
            }}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-blue-400 rounded-full"
          />
        ))}
      </div>

      <div ref={nextSectionRef} className="mt-20">
        <h2 
          ref={nextTextRef}
          className="text-4xl sm:text-4xl md:text-6xl font-bold text-blue-600 leading-tight 
                    max-w-[90%] sm:max-w-[600px] mx-auto tracking-tight px-2 md:px-4 
                    break-words whitespace-normal"
        >
          Unlock Growth with Strategic Insights
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-blue-500">
          Leverage data-driven decisions to stay ahead in an ever-changing market.
        </p>
      </div>
    </div>
  );
}
