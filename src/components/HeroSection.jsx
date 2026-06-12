import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white bg-[#5BA4D3]">

      {/* Background Watermark Text */}
      <div className="absolute top-[60%] lg:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-[22vw] md:text-[14vw] font-black uppercase whitespace-nowrap tracking-tighter select-none pointer-events-none z-0 leading-none flex justify-center gap-4 opacity-80 lg:opacity-100">
        <span className="text-white">DIGITAL</span>
        <span style={{ color: '#CCFF00' }}>SURVEY</span>
      </div>

      {/* Navigation Header */}
      <header className="absolute top-0 left-0 w-full z-40 px-5 py-4 md:px-10 md:py-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col leading-none">
            <span className="text-lg md:text-2xl font-black tracking-tighter text-white">THAJUDEENS</span>
            <span style={{ color: '#CCFF00' }} className="text-[9px] md:text-xs font-bold tracking-widest mt-1">DIGISURVEY & DOCUMENTATION</span>
          </div>

          {/* Desktop nav */}
          <ul className="hidden lg:flex gap-10 list-none items-center text-sm">
            <li className="font-bold"><a href="#main" className="text-white hover:text-white">Main</a></li>
            <li className="opacity-85 hover:opacity-100"><a href="#services" className="text-white hover:text-white">Services</a></li>
            <li className="opacity-85 hover:opacity-100"><a href="#pricing" className="text-white hover:text-white">Pricing</a></li>
            <li className="opacity-85 hover:opacity-100 bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-wider">
              <Link to="/admin/login" className="text-white hover:text-white">Admin Panel</Link>
            </li>
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white hover:bg-white hover:text-[#5BA4D3] transition-all duration-300 text-white" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white hover:bg-white hover:text-[#5BA4D3] transition-all duration-300 text-white" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white hover:bg-white hover:text-[#5BA4D3] transition-all duration-300 text-white" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white gap-[5px] hover:bg-white/20 transition-all ml-1"
              aria-label="Toggle menu"
            >
              <span className={`block w-4 md:w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px] md:translate-y-[7px]' : ''}`} />
              <span className={`block w-4 md:w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-4 md:w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px] md:-translate-y-[7px]' : ''}`} />
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

      {/* Floating Mascot - positioned carefully for mobile */}
      <div className="absolute bottom-[24%] lg:bottom-18 left-1/2 -translate-x-1/2 z-10 w-[220px] sm:w-[300px] lg:w-[450px] xl:w-[500px] pointer-events-none flex justify-center items-end">
        <img src="/elephant.png" alt="Digital Survey Mascot" className="w-full h-auto object-contain drop-shadow-2xl" />
      </div>

      {/* ── Left side: Headline & Button ── */}
      <div className="absolute top-[14%] lg:top-[78%] left-5 lg:left-[5%] translate-y-0 lg:-translate-y-1/2 z-20 w-[90%] md:w-[60%] lg:w-[450px] flex flex-col text-left">

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black leading-tight tracking-tight drop-shadow-md">
          <div className="text-white">Turn On </div>
          <div>
            <span style={{ color: '#CCFF00' }}>Precision. </span>
            <span className="text-white">Turn</span>
          </div>
          <div>
            <span className="text-white">Off </span>
            <span style={{ color: '#CCFF00' }}>Guesswork.</span>
          </div>
        </h1>

        <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-white mt-2 lg:mt-3 font-medium drop-shadow-sm max-w-[400px]">
          A premium digital survey company for land owners and builders who are tired of delays —
          ready for mapping that feels accurate, fast, and unmistakably reliable.
        </p>

        {/* Let's Go Button */}
        <div className="mt-3 lg:mt-8 flex justify-start">
          <button className="bg-[#CCFF00] text-black border-none px-6 py-2.5 lg:px-10 lg:py-3.5 text-xs sm:text-sm lg:text-base font-black rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(204,255,0,0.5)]">
            Let's Go
          </button>
        </div>

      </div>

      {/* ── Right side: Founders Widget ── */}
      <div className="hidden lg:flex absolute bottom-4 right-[5%] z-20 w-[420px]">
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-[24px] w-full px-6 pt-6 pb-8 shadow-2xl">
          <h2 className="text-center text-[13px] font-black uppercase tracking-widest text-white mb-6">Our Founders</h2>

          <div className="grid grid-cols-3 gap-4">
            {/* Ajmal */}
            <div className="bg-white rounded-full flex flex-col items-center p-[6px] pb-5 shadow-lg">
              <div className="w-[100px] h-[100px] rounded-full border-[3px] border-[#00d4ff] overflow-hidden mb-3">
                <img src="/ajmal.png" alt="Ajmal" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-[#111] font-black text-[13px] mb-1">Ajmal</span>
            </div>

            {/* Meera */}
            <div className="bg-white rounded-full flex flex-col items-center p-[6px] pb-5 shadow-lg">
              <div className="w-[100px] h-[100px] rounded-full border-[3px] border-[#00d4ff] overflow-hidden mb-3">
                <img src="/meera.png" alt="Meera" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-[#111] font-black text-[13px] mb-1">Meera</span>
            </div>

            {/* Rahul */}
            <div className="bg-white rounded-full flex flex-col items-center p-[6px] pb-5 shadow-lg">
              <div className="w-[100px] h-[100px] rounded-full border-[3px] border-[#00d4ff] overflow-hidden mb-3">
                <img src="/rahul.png" alt="Rahul" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-[#111] font-black text-[13px] mb-1">Rahul</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile founders widget - hidden on lg, visible on small */}
      <div className="lg:hidden absolute bottom-11 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 w-[95%] sm:w-[80%]">
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-[20px] px-3 pt-3 pb-4 shadow-xl">
          <h2 className="text-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-white mb-3">Our Founders</h2>
          <div className="grid grid-cols-3 gap-2">
            {/* Ajmal */}
            <div className="bg-white rounded-full flex flex-col items-center p-[4px] pb-3 shadow-lg">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[2px] border-[#00d4ff] overflow-hidden mb-1.5">
                <img src="/ajmal.png" alt="Ajmal" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-[#111] font-black text-[10px] sm:text-xs">Ajmal</span>
            </div>
            {/* Meera */}
            <div className="bg-white rounded-full flex flex-col items-center p-[4px] pb-3 shadow-lg">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[2px] border-[#00d4ff] overflow-hidden mb-1.5">
                <img src="/meera.png" alt="Meera" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-[#111] font-black text-[10px] sm:text-xs">Meera</span>
            </div>
            {/* Rahul */}
            <div className="bg-white rounded-full flex flex-col items-center p-[4px] pb-3 shadow-lg">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[2px] border-[#00d4ff] overflow-hidden mb-1.5">
                <img src="/rahul.png" alt="Rahul" className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-[#111] font-black text-[10px] sm:text-xs">Rahul</span>
            </div>
          </div>
        </div>
      </div>

      {/* See More — bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#more"
          className="bg-gradient-to-br from-[#EBF8FD] via-[#F4FBFE] to-[#DDF1FA] text-black font-extrabold text-[11px] sm:text-xs px-8 pt-3 pb-2 lg:px-10 lg:pt-4 lg:pb-3 rounded-t-[20px] lg:rounded-t-[30px] shadow-[0_-5px_15px_rgba(0,0,0,0.1)] no-underline flex flex-col items-center hover:-translate-y-1 transition-transform cursor-pointer"
        >
          See more
        </a>
      </div>

    </div>
  );
}
