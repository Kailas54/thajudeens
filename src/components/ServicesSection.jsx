import React, { useState } from 'react';
import { IconArrowRight, IconArrowLeft, IconPhone, IconMapPin } from '@tabler/icons-react';

const servicesData = [
  {
    title: "Boundary Survey",
    description: "Accurate demarcation of property boundaries to prevent disputes and ensure precise land ownership lines. From capturing the smallest detail to shaping a property's visual identity, our boundary surveys guarantee peace of mind.",
    color: "#3DA5D9", // Primary Blue
    textColor: "text-white",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Land Subdivision",
    description: "Professional division of larger tracts of land into smaller parcels for development, sale, or family partition. We offer comprehensive solutions tailored to your specific planning requirements.",
    color: "#65BCED", // Lighter Blue
    textColor: "text-white",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Building Setting Out",
    description: "Transferring architectural plans onto the ground precisely for foundation and structural construction. Every service we offer is designed to transform your vision into compelling reality.",
    color: "#8DD3F1", // Soft Sky Blue
    textColor: "text-gray-900",
    img: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1000"
  },
  {
    title: "Topographic Mapping",
    description: "Detailed mapping of natural and man-made features, including elevations and contours of your land. Utilizing advanced digital tools to bring the exact shape of your land to your fingertips.",
    color: "#B4EAF5", // Very Light Blue
    textColor: "text-gray-900",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Records Verification",
    description: "Comprehensive background checks and verification of land documents for legal safety and compliance. We ensure that every document stands up to the highest standards of scrutiny.",
    color: "#D2F4FA", // Pale Icy Blue
    textColor: "text-gray-900",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Loans & Permits",
    description: "Certified surveying and documentation required for securing bank loans and building permits quickly and efficiently. Let us handle the red tape so you can focus on building.",
    color: "#E6F9FB", // Almost White Blue
    textColor: "text-gray-900",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  const nextSlide = () => setActive((prev) => (prev + 1) % servicesData.length);
  const prevSlide = () => setActive((prev) => (prev - 1 + servicesData.length) % servicesData.length);

  const activeService = servicesData[active];

  return (
    <section id="services" className="w-full bg-[#FAFAFA] py-16 px-4 md:px-8 relative overflow-hidden font-sans">
      
      {/* Contact Bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 pb-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 tracking-wider uppercase mb-4 md:mb-0">
          Thajudeens <span className="font-light text-gray-500">Digisurvey</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-gray-600 font-medium items-center">
          <div className="flex items-center gap-2">
            <IconPhone size={18} />
            <span>8848728661 | 9447128661</span>
          </div>
          <div className="flex items-center gap-2">
            <IconMapPin size={18} />
            <span>Thiruvananthapuram</span>
          </div>
        </div>
      </div>

      {/* Background Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none overflow-hidden flex justify-between px-4 z-0">
        <span className="text-[24vw] font-serif text-black/[0.03] leading-none select-none -ml-[5%]">THAJU</span>
        <span className="text-[24vw] font-serif text-black/[0.03] leading-none select-none -mr-[5%]">DEEN</span>
      </div>

      {/* Main Carousel Area */}
      <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-center h-auto md:h-[600px]">
        
        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-2 md:left-4 z-30 w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-300 flex items-center justify-center bg-white/60 backdrop-blur-md hover:bg-white hover:scale-110 transition-all text-gray-600 shadow-sm">
          <IconArrowLeft size={20} stroke={1.5} />
        </button>
        
        <button onClick={nextSlide} className="absolute right-2 md:right-4 z-30 w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-300 flex items-center justify-center bg-white/60 backdrop-blur-md hover:bg-white hover:scale-110 transition-all text-gray-600 shadow-sm">
          <IconArrowRight size={20} stroke={1.5} />
        </button>

        {/* Split Layout Container */}
        <div className="w-full max-w-4xl h-full flex flex-col md:flex-row items-center justify-center relative px-6 md:px-0 py-8 md:py-0">
          
          {/* Left Text Block */}
          <div 
            key={`text-${active}`}
            className={`w-full md:w-[50%] h-auto md:h-[500px] z-20 p-8 md:p-12 flex flex-col justify-center transition-colors duration-700 shadow-xl relative animate-fade-in ${activeService.textColor} md:[mask-image:radial-gradient(circle_at_100%_50%,transparent_45px,black_46px)] md:[-webkit-mask-image:radial-gradient(circle_at_100%_50%,transparent_45px,black_46px)]`}
            style={{ 
              backgroundColor: activeService.color
            }}
          >
            <div className={`border rounded-full px-3 py-1 text-[10px] md:text-xs w-max mb-4 md:mb-6 uppercase tracking-widest font-medium ${activeService.textColor === 'text-white' ? 'border-white/50' : 'border-gray-900/50'}`}>
              Service 0{active + 1}
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase leading-[1.1] mb-4 md:mb-6 tracking-wide drop-shadow-sm">
              {activeService.title}
            </h2>
            
            <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-light md:pr-2 ${activeService.textColor === 'text-white' ? 'text-white/90' : 'text-gray-800'}`}>
              <span className="font-bold opacity-100">- At Thajudeens,</span> {activeService.description}
            </p>
            
            <div className="mt-auto md:mt-8">
              <button className={`border rounded-full px-5 py-2 md:px-6 md:py-2.5 flex items-center gap-2 text-[10px] sm:text-xs md:text-sm transition-colors uppercase tracking-widest ${activeService.textColor === 'text-white' ? 'border-white/70 hover:bg-white hover:text-black' : 'border-gray-900/70 hover:bg-gray-900 hover:text-white'}`}>
                View Portfolio <IconArrowRight size={16} className="rotate-45" />
              </button>
            </div>
          </div>

          {/* Right Image Block - Stacks underneath on mobile */}
          <div className="w-full md:w-[60%] h-[250px] sm:h-[350px] md:h-[600px] md:-ml-[8%] z-10 relative shadow-2xl overflow-hidden mt-4 md:mt-0">
            <img 
              key={`img-${active}`}
              src={activeService.img} 
              alt={activeService.title} 
              className="w-full h-full object-cover animate-fade-in" 
            />
          </div>

        </div>
      </div>
      
    </section>
  );
}
