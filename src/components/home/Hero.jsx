import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    headline: 'Fast-growing broker with a client-first approach & collaborative spirit',
    sub: 'Insurance made simple, Business made secure. Helping you choose the best protection since 2022.',
    bg: '/images/backgrounds/hero-bg.png',
  },
  {
    headline: 'Comprehensive coverage tailored to protect your business & family',
    sub: 'Analyze, Compare, and Save. Secure your future today with PIB expert counseling.',
    bg: '/images/backgrounds/hero-bg.png', 
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent(prev => (prev + 1) % slides.length);

  return (
    <section className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden bg-[#00384a]">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/assets/hero_corporate_6.mp4" type="video/mp4" />
        </video>
        {/* Overlays */}
        <div className="absolute inset-0 bg-[#00384a]/65"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00384a]/90 via-[#00384a]/40 to-transparent"></div>
      </div>

      <div className="section-container relative z-30 w-full pt-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-16 h-[2px] bg-[#3a9dc4]"></div>
             <span className="text-[#3a9dc4] font-bold text-[14px] uppercase tracking-[0.2em]">
                Est. 2022 | ISO Certified
             </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-10 tracking-tight">
            {slides[current].headline}
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl leading-relaxed font-medium">
            {slides[current].sub}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link
              to="/quote"
              className="bg-[#3a9dc4] hover:bg-[#2d8ab3] text-white font-bold px-12 py-5 rounded-full flex items-center gap-3 transition-all text-sm uppercase tracking-widest shadow-2xl shadow-[#3a9dc4]/20 w-full sm:w-auto justify-center"
            >
              Get Free Quote
            </Link>
            
            <Link
              to="/contact"
              className="border-2 border-white/20 hover:border-white hover:bg-white/5 text-white font-bold px-12 py-5 rounded-full transition-all text-sm uppercase tracking-widest w-full sm:w-auto justify-center"
            >
              Request a Callback
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 right-10 z-40 flex items-center gap-4">
        <button onClick={prev} className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#3a9dc4] hover:border-[#3a9dc4] transition-all backdrop-blur-md">
          <ChevronLeft size={28} />
        </button>
        <button onClick={next} className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#3a9dc4] hover:border-[#3a9dc4] transition-all backdrop-blur-md">
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}
