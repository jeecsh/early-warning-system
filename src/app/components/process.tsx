"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ArrowUpTrayIcon, UserGroupIcon, CpuChipIcon } from "@heroicons/react/24/outline";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const Process = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  const steps = [
    {
      icon: ArrowUpTrayIcon,
      title: "Upload Report",
      description: "Securely submit financial documents for analysis",
      color: "text-blue-600",
    },
    {
      icon: UserGroupIcon,
      title: "Expert Review",
      description: "Domain experts analyze and provide feedback",
      color: "text-purple-600",
    },
    {
      icon: CpuChipIcon,
      title: "AI Processing",
      description: "LLM generates final insights report",
      color: "text-indigo-600",
    },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Animate steps
      gsap.from(stepsRef.current, {
        opacity: 0,
        y: 100,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top center",
        },
      });

      // Animate path drawing
      if (pathRef.current) {
        gsap.from(pathRef.current, {
          scrollTrigger: {
            trigger: componentRef.current,
            start: "top center",
          },
          drawSVG: "0%",
          duration: 1.5,
          delay: 0.5,
          ease: "power2.inOut",
        });
      }
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Workflow Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seamless integration of human expertise and AI-powered analysis
          </p>
        </div>

        {/* Process steps */}
        <div className="relative flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {/* SVG connector line */}
          <svg 
            className="absolute hidden md:block w-full h-24 top-1/3"
            viewBox="0 0 100 24"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M2 12C20 12 30 2 50 12 70 22 80 12 98 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="text-gray-200"
            />
          </svg>

          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              ref={(el) => (stepsRef.current[index] = el)}
              Icon={step.icon}
              title={step.title}
              description={step.description}
              color={step.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessStep = forwardRef<HTMLDivElement, {
  Icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}>(({ Icon, title, description, color }, ref) => (
  <div
    ref={ref}
    className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-64 h-64 group"
  >
    <div className={`mb-4 p-4 rounded-full ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
      <Icon className={`w-12 h-12 ${color} transition-colors`} />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
));

ProcessStep.displayName = "ProcessStep";

export default Process;