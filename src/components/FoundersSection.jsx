import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { IconCalendar, IconMail, IconBrandLinkedin, IconArrowRight } from '@tabler/icons-react';

const foundersData = [
  {
    id: 1,
    name: "Ajmal",
    role: "Founding Engineer & Chief Surveyor",
    bio: [
      "I started Thajudeens because too many great projects are delayed by inaccurate mapping and unreliable land records. The vision was simple: build a survey company that actually delivers on time.",
      "I've spent over a decade leading digital surveying for major infrastructure projects. Worked on everything from zero-to-one property maps to massive topographic models for commercial builds.",
      "Being a founder means wearing every hat - field surveyor, data analyst, client liaison. I learned what good surveying actually does for a business: not just lines on a map, but the foundation for scaling.",
      "Now I do that same work for builders who can't afford delays. Precision by design. Direct line, no guesswork."
    ],
    image: "/ajmal.png",
    signature: "Ajmal" // We'll use a fancy cursive font for this
  },
  {
    id: 2,
    name: "Meera",
    role: "Head of Operations & Legal",
    bio: [
      "I joined Thajudeens because the land documentation space was completely broken. Great builders were stuck waiting months for simple verification.",
      "I've spent years navigating the complex legal frameworks of property development. Handled everything from boundary disputes to securing massive bank loan clearances for enterprise clients.",
      "Leading operations means ensuring every piece of data is airtight. I learned that good documentation isn't just about avoiding lawsuits—it's about accelerating growth and building trust.",
      "Now I provide that same bulletproof reliability for our clients. Flawless execution. Total transparency."
    ],
    image: "/meera.png",
    signature: "Meera"
  },
  {
    id: 3,
    name: "Rahul",
    role: "Lead Topographic Analyst",
    bio: [
      "I came to Thajudeens because I saw the potential of advanced digital mapping. The old ways of surveying simply couldn't keep up with modern architectural demands.",
      "I've dedicated my career to mastering drone topography and 3D modeling. Built systems that reduce mapping time from weeks to mere days, without sacrificing a millimeter of accuracy.",
      "Being an analyst means seeing the story behind the terrain. I learned that top-tier surveying isn't just about measuring land, it's about predicting challenges before the first shovel hits the dirt.",
      "Now I bring that advanced technology directly to our clients. Cutting-edge tools. Unmatched speed."
    ],
    image: "/rahul.png",
    signature: "Rahul"
  }
];

export default function FoundersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  
  // Timer ref to handle cleanup
  const timerRef = useRef(null);

  useEffect(() => {
    // Entrance Animation - PPT Style (Text from Left, Image from Right)
    const tl = gsap.timeline();

    tl.fromTo(textRef.current, 
      { opacity: 0, x: -150 }, 
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    ).fromTo(imageRef.current, 
      { opacity: 0, x: 150 }, 
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "<" // The "<" symbol makes them start at the exact same time
    );

    // Schedule Exit Animation and Next Slide
    timerRef.current = setTimeout(() => {
      // Exit Animation - Continue the slide direction (Text to right, Image to left)
      gsap.to(textRef.current, { opacity: 0, x: 150, duration: 0.5, ease: "power2.in" });
      gsap.to(imageRef.current, { opacity: 0, x: -150, duration: 0.5, ease: "power2.in", onComplete: () => {
        // Switch to next founder after exit completes
        setCurrentIndex((prev) => (prev + 1) % foundersData.length);
      }});
    }, 3000); // Wait 3 seconds before transitioning

    return () => {
      clearTimeout(timerRef.current);
      gsap.killTweensOf(textRef.current);
      gsap.killTweensOf(imageRef.current);
    };
  }, [currentIndex]);

  const currentFounder = foundersData[currentIndex];

  return (
    <section ref={sectionRef} className="w-full min-h-[800px] bg-gradient-to-br from-[#EBF8FD] via-[#F4FBFE] to-[#DDF1FA] py-20 px-6 md:px-16 lg:px-24 flex items-center justify-center overflow-hidden font-sans">
      <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content (Text) */}
        <div ref={textRef} className="w-full lg:w-[55%] flex flex-col items-start opacity-0">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 flex items-center gap-3 tracking-tight">
            Hello <span className="text-4xl">👋</span>
          </h2>
          <p className="text-gray-500 font-bold text-lg md:text-xl mb-8">
            I'm {currentFounder.name} <span className="font-medium opacity-80">(the {currentFounder.role.toLowerCase()})</span>
          </p>

          <div className="flex flex-col gap-5 text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
            {currentFounder.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Signature Area */}
          <div className="mt-10 mb-8 w-full flex items-center justify-start">
            <span className="font-['Brush_Script_MT',cursive] text-6xl text-gray-800 -rotate-3 opacity-90 select-none">
              {currentFounder.signature}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
            <button className="bg-[#111] hover:bg-black text-white px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-3 transition-transform hover:scale-105 shadow-xl">
              Let's Talk <IconArrowRight size={18} />
            </button>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Let's Connect</span>
              <div className="flex gap-4 text-gray-500">
                <a href="#" className="hover:text-black transition-colors"><IconCalendar size={20} stroke={1.5} /></a>
                <a href="#" className="hover:text-black transition-colors"><IconMail size={20} stroke={1.5} /></a>
                <a href="#" className="hover:text-black transition-colors"><IconBrandLinkedin size={20} stroke={1.5} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div ref={imageRef} className="w-full lg:w-[45%] h-[300px] sm:h-[400px] lg:h-[700px] flex items-end justify-center relative opacity-0 mt-8 lg:mt-0">
          {/* Subtle glow behind the image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/40 blur-3xl rounded-full z-0" />
          
          <img 
            src={currentFounder.image} 
            alt={currentFounder.name} 
            className="w-full h-full object-contain object-bottom z-10 drop-shadow-2xl grayscale-[20%] contrast-125"
          />
        </div>

      </div>
    </section>
  );
}
