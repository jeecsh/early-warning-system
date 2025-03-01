// "use client"
// ;import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger);

// const HowItWorksSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const subheadingRef = useRef<HTMLParagraphElement>(null);
//   const timelineRef = useRef<HTMLDivElement>(null);
//   const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const connectorsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

//   // Process steps data from the SRS
//   const processSteps = [
//     {
//       index: 1,
//       title: "Submit Financial Data",
//       description: "Users upload their financial and operational data securely to begin the evaluation process.",
//       icon: (
//         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//           <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
//         </svg>
//       )
//     },
//     {
//       index: 2,
//       title: "Automated Analysis",
//       description: "The system processes the data using predefined financial metrics and risk assessment algorithms.",
//       icon: (
//         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//           <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
//           <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
//         </svg>
//       )
//     },
//     {
//       index: 3,
//       title: "Expert Review",
//       description: "Financial, management, and market experts review your data and provide specialized feedback.",
//       icon: (
//         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//           <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
//         </svg>
//       )
//     },
//     {
//       index: 4,
//       title: "LLM-Powered Final Report",
//       description: "Expert comments are processed using our Large Language Model to generate a comprehensive final report.",
//       icon: (
//         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//           <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
//         </svg>
//       )
//     },
//     {
//       index: 5,
//       title: "Download & Act",
//       description: "Receive your detailed report with actionable recommendations to improve your business health.",
//       icon: (
//         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//           <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
//         </svg>
//       )
//     }
//   ];

//   useEffect(() => {
//     const section = sectionRef.current;
//     const heading = headingRef.current;
//     const subheading = subheadingRef.current;
//     const steps = stepsRef.current;
//     const connectors = connectorsRef.current;
//     const icons = iconsRef.current;
    
//     if (section && heading && subheading && steps.length && connectors.length && icons.length) {
//       // Create the main timeline
//       const mainTimeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top 70%",
//         }
//       });
      
//       // Animate the heading and subheading
//       mainTimeline.fromTo(
//         heading,
//         { opacity: 0, y: -30 },
//         { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
//       ).fromTo(
//         subheading,
//         { opacity: 0, y: -20 },
//         { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
//         "-=0.6"
//       );
      
//       // Animate each step and its connector
//       steps.forEach((step, index) => {
//         if (!step) return;
        
//         // Step card animation
//         const stepTimeline = gsap.timeline({
//           scrollTrigger: {
//             trigger: step,
//             start: "top 75%",
//           }
//         });
        
//         stepTimeline.fromTo(
//           step,
//           { opacity: 0, y: 40 },
//           { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
//         );
        
//         // Icon animation
//         if (icons[index]) {
//           const icon = icons[index]?.querySelector('svg');
//           if (icon) {
//             switch(index) {
//               case 0: // Upload animation
//                 stepTimeline.fromTo(
//                   icon,
//                   { y: -20, opacity: 0 },
//                   { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
//                   "-=0.4"
//                 );
//                 break;
//               case 1: // Analysis animation
//                 stepTimeline.fromTo(
//                   icon,
//                   { scale: 0.5, opacity: 0 },
//                   { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" },
//                   "-=0.4"
//                 );
//                 break;
//               case 2: // Expert review animation
//                 stepTimeline.fromTo(
//                   icon,
//                   { rotation: -30, opacity: 0 },
//                   { rotation: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
//                   "-=0.4"
//                 );
//                 break;
//               case 3: // LLM report animation
//                 stepTimeline.fromTo(
//                   icon,
//                   { scale: 0.7, opacity: 0 },
//                   { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
//                   "-=0.4"
//                 );
//                 break;
//               case 4: // Download animation
//                 stepTimeline.fromTo(
//                   icon,
//                   { y: -15, opacity: 0 },
//                   { 
//                     y: 0, 
//                     opacity: 1, 
//                     duration: 0.5, 
//                     ease: "bounce.out",
//                     onComplete: () => {
//                       gsap.to(icon, {
//                         y: 3,
//                         repeat: 1,
//                         yoyo: true,
//                         duration: 0.3,
//                         delay: 0.2
//                       });
//                     }
//                   },
//                   "-=0.4"
//                 );
//                 break;
//               default:
//                 stepTimeline.fromTo(
//                   icon,
//                   { scale: 0.5, opacity: 0 },
//                   { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
//                   "-=0.4"
//                 );
//             }
//           }
//         }
        
//         // Connector animation
//         if (connectors[index] && index < processSteps.length - 1) {
//           stepTimeline.fromTo(
//             connectors[index],
//             { width: "0%" },
//             { width: "100%", duration: 1, ease: "power1.inOut" },
//             "-=0.2"
//           );
//         }
//       });
//     }
//   }, []);

//   return (
//     <section ref={sectionRef} className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         {/* Section heading */}
//         <h2 
//           ref={headingRef} 
//           className="text-4xl font-bold text-center mb-4 text-gray-900"
//         >
//           How It Works: From Data to Insights
//         </h2>
        
//         {/* Section subheading */}
//         <p 
//           ref={subheadingRef} 
//           className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
//         >
//           A seamless process to evaluate your business health and generate actionable insights.
//         </p>
        
//         {/* Timeline container */}
//         <div ref={timelineRef} className="relative">
//           {/* Mobile timeline (vertical layout) */}
//           <div className="md:hidden space-y-16">
//             {processSteps.map((step, index) => (
//               <div 
//                 key={`mobile-step-${index}`} 
//                 ref={el => stepsRef.current[index] = el}
//                 className="relative bg-white rounded-lg shadow-lg p-6 transform"
//               >
//                 {/* Step number badge */}
//                 <div className="absolute top-0 left-0 -mt-4 -ml-4 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm z-10">
//                   {step.index}
//                 </div>
                
//                 {/* Icon container */}
//                 <div 
//                   ref={el => iconsRef.current[index] = el}
//                   className="mb-4 text-indigo-600"
//                 >
//                   <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-indigo-100">
//                     {step.icon}
//                   </div>
//                 </div>
                
//                 <h3 className="text-xl font-bold mb-2 text-center">{step.title}</h3>
//                 <p className="text-gray-600 text-center">{step.description}</p>
                
//                 {/* Vertical connector for mobile */}
//                 {index < processSteps.length - 1 && (
//                   <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-16 w-1 bg-gray-200 overflow-hidden">
//                     <div 
//                       ref={el => connectorsRef.current[index] = el}
//                       className="w-full h-0 bg-indigo-500"
//                       style={{ transformOrigin: 'top' }}
//                     ></div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
          
//           {/* Desktop timeline (horizontal layout) */}
//           <div className="hidden md:block">
//             <div className="grid grid-cols-5 gap-6">
//               {processSteps.map((step, index) => (
//                 <div 
//                   key={`desktop-step-${index}`}
//                   ref={el => stepsRef.current[index] = el} 
//                   className="relative bg-white rounded-lg shadow-lg p-6 transform"
//                 >
//                   {/* Step number badge */}
//                   <div className="absolute top-0 left-0 -mt-4 -ml-4 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm z-10">
//                     {step.index}
//                   </div>
                  
//                   {/* Icon container */}
//                   <div 
//                     ref={el => iconsRef.current[index] = el}
//                     className="mb-4 text-indigo-600"
//                   >
//                     <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-indigo-100">
//                       {step.icon}
//                     </div>
//                   </div>
                  
//                   <h3 className="text-xl font-bold mb-2 text-center">{step.title}</h3>
//                   <p className="text-gray-600 text-center">{step.description}</p>
                  
//                   {/* Horizontal connector for desktop */}
//                   {index < processSteps.length - 1 && (
//                     <div className="absolute top-1/2 -translate-y-1/2 left-full w-full h-1 bg-gray-200 transform -translate-x-6 z-0 overflow-hidden">
//                       <div 
//                         ref={el => connectorsRef.current[index] = el}
//                         className="h-full w-0 bg-indigo-500"
//                       ></div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Optional CTA section */}
//         <div className="mt-16 text-center">
//           <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300">
//             Get Started Today
//           </button>
//           <p className="mt-4 text-gray-600">
//             Gain valuable insights into your business health and receive actionable recommendations.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorksSection;