import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { IconArrowRight, IconBuilding, IconUsers, IconCertificate } from '@tabler/icons-react';

const leadershipData = [
  {
    id: 1,
    name: "Founder's Name",
    role: 'Founder & Chief Technical Specialist',
    experience: '45+ Years in Active Practice',
    specialization: 'Complex Boundary Disputes • Deed Preparation • Advanced Land Surveying • e-Revenue Workflows',
    bio: 'Establishing our Nedumangad office in 1985, he personally resolves intricate land challenges, overlapping claims, and revenue corrections. As an authorized vendor, he directly manages modern field operations using Total Station instruments and digital mapping tools while seamlessly navigating official online portals for Smart Land services and digital mutation (Pokkuvaravu).',
    image: '/ajmal.png',
  },
  {
    id: 2,
    name: "Eldest Brother's Name",
    role: 'Senior Technical Advisor & Founding Mentor',
    experience: '60+ Years in Land Surveying',
    background: 'Retired Superintendent of Survey & Land Records (2004)',
    bio: 'Offers unparalleled expertise in interpreting historical block maps, establishing measurement standards, and navigating complex government resurvey procedures.',
    image: '/rahul.png',
  },
  {
    id: 3,
    name: "Brother's Name",
    role: 'Senior Revenue & Administrative Advisor',
    experience: '50+ Years in Revenue Field Administration',
    background: 'Retired Tehsildar (2021)',
    bio: 'Provides authoritative guidance on revenue record corrections, land classifications, fair value determinations, and statutory clearances through local revenue offices.',
    image: '/meera.png',
  },
];

const engineeringServices = [
  'Architectural Plans for Panchayat & Municipality Building Permits',
  'Certified Building Assessments & Structural Evaluations',
  'Official Property Valuation Certificates',
];

export default function FoundersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { opacity: 0, x: -150 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      imageRef.current,
      { opacity: 0, x: 150 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '<'
    );

    timerRef.current = setTimeout(() => {
      gsap.to(textRef.current, { opacity: 0, x: 150, duration: 0.5, ease: 'power2.in' });
      gsap.to(imageRef.current, {
        opacity: 0,
        x: -150,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % leadershipData.length);
        },
      });
    }, 5000);

    return () => {
      clearTimeout(timerRef.current);
      gsap.killTweensOf(textRef.current);
      gsap.killTweensOf(imageRef.current);
    };
  }, [currentIndex]);

  const currentLeader = leadershipData[currentIndex];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-[#EBF8FD] via-[#F4FBFE] to-[#DDF1FA] py-20 px-6 md:px-16 lg:px-24 overflow-hidden font-sans"
    >
      <div className="w-full max-w-7xl mx-auto">

        {/* Intro */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-[#5BA4D3] mb-4">
            About Us
          </p>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight tracking-tight mb-6">
            Four Decades of Unwavering Trust &amp; Technical Authority in Nedumangad.
          </blockquote>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium max-w-3xl mx-auto">
            Combining over six decades of cumulative revenue expertise with modern digital survey
            technologies, we deliver end-to-end land, legal, and engineering solutions under one roof.
          </p>
          <div className="w-24 h-1.5 bg-[#CCFF00] mx-auto mt-8 rounded-full" />
        </div>

        {/* Leadership Carousel */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight mb-10 text-center">
            Our Leadership
          </h2>

          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            <div ref={textRef} className="w-full lg:w-[55%] flex flex-col items-start">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5BA4D3] mb-3">
                Leadership {currentIndex + 1} / {leadershipData.length}
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-1 tracking-tight">
                {currentLeader.name}
              </h3>
              <p className="text-[#5BA4D3] font-bold text-base md:text-lg mb-6">
                {currentLeader.role}
              </p>

              <ul className="space-y-2 mb-6 text-sm md:text-base text-gray-700 w-full">
                <li>
                  <span className="font-bold text-gray-900">Experience: </span>
                  {currentLeader.experience}
                </li>
                {currentLeader.specialization && (
                  <li className="mt-2">
                    <span className="font-bold text-gray-900">Specialization: </span>
                    {currentLeader.specialization}
                  </li>
                )}
                {currentLeader.background && (
                  <li className="mt-2">
                    <span className="font-bold text-gray-900">Background: </span>
                    {currentLeader.background}
                  </li>
                )}
              </ul>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium max-w-2xl">
                <span className="font-bold text-gray-900">Bio: </span>
                {currentLeader.bio}
              </p>

              <div className="flex items-center gap-3 mt-8">
                {leadershipData.map((leader, idx) => (
                  <button
                    key={leader.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-8 bg-[#5BA4D3]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`View ${leader.name}`}
                  />
                ))}
              </div>

              <button className="mt-8 bg-[#111] hover:bg-black text-white px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-3 transition-transform hover:scale-105 shadow-xl">
                Let&apos;s Talk <IconArrowRight size={18} />
              </button>
            </div>

            <div
              ref={imageRef}
              className="w-full lg:w-[45%] h-[320px] sm:h-[420px] lg:h-[560px] flex items-end justify-center relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/40 blur-3xl rounded-full z-0" />
              <img
                src={currentLeader.image}
                alt={currentLeader.name}
                className="w-full h-full object-contain object-bottom z-10 drop-shadow-2xl grayscale-[10%] contrast-110"
              />
            </div>
          </div>
        </div>

        {/* Engineering & Operations */}
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight mb-10 text-center">
            Engineering &amp; Operations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#5BA4D3] text-white rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <IconBuilding size={22} stroke={1.5} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-wide">Authorized Civil Engineering</h3>
              </div>
              <p className="text-white/90 text-sm mb-5 font-medium">
                Led by a certified Civil Engineer, our structural division provides:
              </p>
              <ul className="space-y-3">
                {engineeringServices.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-white/95">
                    <span className="text-[#CCFF00] font-black shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#5BA4D3]/15 flex items-center justify-center text-[#5BA4D3]">
                  <IconUsers size={22} stroke={1.5} />
                </div>
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide">Dedicated Support Team</h3>
              </div>
              <div className="flex items-start gap-3">
                <IconCertificate size={20} className="text-[#5BA4D3] shrink-0 mt-0.5" stroke={1.5} />
                <p className="text-sm text-gray-600 leading-relaxed">
                  Backed by <span className="font-black text-gray-900">11+ full-time professionals</span>,
                  including qualified digital survey engineers, Total Station operators, CAD draftspersons,
                  and revenue documentation assistants dedicated to speed, accuracy, and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
