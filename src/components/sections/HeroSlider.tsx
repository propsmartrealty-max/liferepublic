import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

const slides = [
  {
    id: 1,
    image: '/images/home/slider-1.webp',
    title: 'Welcome to Life Republic',
    subtitle: 'A 400-Acre Integrated Township in Hinjewadi, Pune',
  },
  {
    id: 2,
    image: '/images/home/slider-2.webp',
    title: 'World-Class Amenities',
    subtitle: 'Over 50+ lifestyle features designed for your well-being',
  },
  {
    id: 3,
    image: '/images/home/slider-3.webp',
    title: 'The Canvas of Luxury',
    subtitle: 'Premium 3 & 4 BHK residences with skyline views',
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-primary">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80 z-10" />
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
            loading={current === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl"
        >
          <span className="inline-block py-1.5 px-4  bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-tight mb-6">
            Kolte Patil Developers
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter text-white leading-[1.05] mb-6 drop-shadow-lg">
            {slides[current].title}
          </h1>
          <p className="text-xl md:text-2xl text-white text-white/90 font-medium tracking-tight mb-10 max-w-2xl drop-shadow-md">
            {slides[current].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className=" px-8 bg-white text-primary hover:bg-white/90 glow-effect" onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry'))}>
              Schedule a Visit
            </Button>
            <Button size="lg" variant="outline" className=" px-8 border-white/30 text-white hover:bg-white/10 glass-panel" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Clusters
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-6 md:left-12 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1  transition-all duration-500 ${current === idx ? 'w-12 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
