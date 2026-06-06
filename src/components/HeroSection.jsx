import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white" style={{ backgroundColor: '#3DA5D9' }}>

      {/* Background Watermark Text */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black uppercase whitespace-nowrap tracking-tighter select-none pointer-events-none z-0 block">
        <span className="text-white/95">DIGITAL</span>
        <span style={{ color: '#CCFF00' }}>SURVEY</span>
      </div>

      {/* Navigation Header */}
      <header className="absolute top-0 left-0 w-full z-40 px-6 py-4 md:px-10 md:py-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col leading-none">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">THAJUDEENS</span>
            <span style={{ color: '#CCFF00' }} className="text-[10px] md:text-xs font-bold tracking-widest mt-1">DIGISURVEY & DOCUMENTATION</span>
          </div>

          {/* Desktop nav */}
          <ul className="hidden lg:flex gap-10 list-none items-center text-sm">
            <li className="font-bold border-b-2 border-white"><a href="#main">Main</a></li>
            <li className="opacity-85 hover:opacity-100"><a href="#services">Services</a></li>
            <li className="opacity-85 hover:opacity-100"><a href="#pricing">Pricing</a></li>
            <li className="opacity-85 hover:opacity-100 bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-wider">
              <Link to="/admin/login">Admin Panel</Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            {/* Social icons */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/40 hover:bg-white hover:text-[#3DA5D9] transition-all duration-300" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/40 hover:bg-white hover:text-[#3DA5D9] transition-all duration-300" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full border border-white/40 gap-[5px] hover:bg-white/20 transition-all"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64 mt-4' : 'max-h-0'}`}>
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 px-5 py-4 flex flex-col gap-4">
            <a href="#main" onClick={() => setMenuOpen(false)} className="text-white font-bold text-base border-b border-white/20 pb-3">Main</a>
            <a href="#services" onClick={() => setMenuOpen(false)} className="text-white/90 font-medium text-base border-b border-white/20 pb-3">Services</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-white/90 font-medium text-base border-b border-white/20 pb-3">Pricing</a>
            <Link to="/admin/login" onClick={() => setMenuOpen(false)} className="text-white font-black text-sm uppercase tracking-widest bg-white/20 rounded-xl px-4 py-2 text-center">Admin Panel</Link>
          </div>
        </div>
      </header>

      {/* Floating Elephant Mascot - fully visible on all screens */}
      <div className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[200px] sm:w-[300px] lg:w-[450px] pointer-events-none animate-float flex justify-center items-center opacity-90 lg:opacity-100">
        <img
          src="/elephant.png"
          alt="Digital Survey Mascot Elephant"
          className="w-full h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)]"
        />
      </div>

      {/* Left Content + Founders Card — unified column */}
      <div className="absolute top-[58%] left-1/2 -translate-x-1/2 lg:left-[8%] lg:translate-x-0 z-20 w-[92%] sm:w-[80%] md:w-[55%] lg:max-w-xl text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
          <span className="text-white">Turn On </span>
          <span style={{ color: '#CCFF00' }}>Precision.</span>
          <br />
          <span className="text-white">Turn Off </span>
          <span style={{ color: '#CCFF00' }}>Guesswork.</span>
        </h1>

        <p className="hidden sm:block text-xs md:text-sm lg:text-base leading-relaxed text-white/90 mt-3 font-medium drop-shadow-sm">
          A premium digital survey company for land owners and builders who are tired of delays —
          ready for mapping that feels accurate, fast, and unmistakably reliable.
        </p>

        {/* Let's Go Button — centered */}
        <div className="mt-4 md:mt-6 flex justify-center lg:justify-start">
          <button className="bg-[#CCFF00] text-black border-none px-8 py-3 text-sm lg:text-base font-black rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(204,255,0,0.5)]">
            Let's Go
          </button>
        </div>

        {/* Founders Widget — directly below button */}
        <div className="mt-4 sm:mt-5">
          <div className="bg-white/12 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
            <h2 className="text-center text-xs sm:text-sm font-extrabold uppercase tracking-[1.5px] text-white">Our Founders</h2>
            <div className="grid grid-cols-3 gap-3">

              {/* Ajmal */}
              <div className="flex flex-col items-center relative pt-14">
                <div className="absolute top-0 w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] md:w-[76px] md:h-[76px] rounded-full bg-white p-[3px] shadow-[0_0_15px_#00f0ff] hover:scale-110 hover:shadow-[0_0_25px_#00f0ff] transition-all duration-300 z-20">
                  <img src="/ajmal.png" alt="Ajmal" className="w-full h-full rounded-full object-cover border-2 border-[#00f0ff]" />
                </div>
                <div className="bg-white rounded-xl w-full pt-8 pb-2 text-center z-10 shadow-md px-2">
                  <span className="text-[#111] font-black text-[11px] sm:text-xs">Ajmal</span>
                </div>
              </div>

              {/* Meera */}
              <div className="flex flex-col items-center relative pt-14">
                <div className="absolute top-0 w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] md:w-[76px] md:h-[76px] rounded-full bg-white p-[3px] shadow-[0_0_15px_#00f0ff] hover:scale-110 hover:shadow-[0_0_25px_#00f0ff] transition-all duration-300 z-20">
                  <img src="/meera.png" alt="Meera" className="w-full h-full rounded-full object-cover border-2 border-[#00f0ff]" />
                </div>
                <div className="bg-white rounded-xl w-full pt-8 pb-2 text-center z-10 shadow-md px-2">
                  <span className="text-[#111] font-black text-[11px] sm:text-xs">Meera</span>
                </div>
              </div>

              {/* Rahul */}
              <div className="flex flex-col items-center relative pt-14">
                <div className="absolute top-0 w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] md:w-[76px] md:h-[76px] rounded-full bg-white p-[3px] shadow-[0_0_15px_#00f0ff] hover:scale-110 hover:shadow-[0_0_25px_#00f0ff] transition-all duration-300 z-20">
                  <img src="/rahul.png" alt="Rahul" className="w-full h-full rounded-full object-cover border-2 border-[#00f0ff]" />
                </div>
                <div className="bg-white rounded-xl w-full pt-8 pb-2 text-center z-10 shadow-md px-2">
                  <span className="text-[#111] font-black text-[11px] sm:text-xs">Rahul</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* See More — sits naturally below founders, never overlaps */}
        <div className="flex justify-center mt-4">
          <a href="#services" className="bg-gradient-to-br from-[#EBF8FD] via-[#F4FBFE] to-[#DDF1FA] text-black font-bold text-xs px-8 py-2.5 rounded-2xl cursor-pointer shadow-md no-underline inline-block hover:shadow-lg transition-all duration-300">
            See more
          </a>
        </div>
      </div>

    </div>
  );
}
