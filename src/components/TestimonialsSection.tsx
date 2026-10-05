import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/mockData';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = TESTIMONIALS_DATA.length;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-orange-100/80 text-[#EA580C] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Reviews</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-['Outfit']"
          >
            What Our Clients Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Read genuine feedback from business owners, startup founders, and industry partners who scaled with Victorious Innovatech Solutions.
          </motion.p>
        </div>

        {/* Testimonials Slider Main Container */}
        <div className="max-w-4xl mx-auto relative px-2 sm:px-12">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-slate-900 text-slate-700 hover:text-white shadow-lg border border-slate-200/80 flex items-center justify-center transition-all duration-300 z-20 cursor-pointer group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-slate-900 text-slate-700 hover:text-white shadow-lg border border-slate-200/80 flex items-center justify-center transition-all duration-300 z-20 cursor-pointer group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Animated Slide Card */}
          <div className="relative min-h-[340px] sm:min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-900/5 border border-slate-200/80 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Decorative Quote Watermark */}
                <Quote className="absolute top-6 right-6 sm:right-10 w-16 h-16 text-orange-100/70 z-0 pointer-events-none" />

                {/* Top: Star Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                  <div className="flex items-center gap-1.5">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Client</span>
                  </span>
                </div>

                {/* Review Text */}
                <blockquote className="text-slate-700 text-base sm:text-xl leading-relaxed italic mb-8 relative z-10 font-normal">
                  "{current.content}"
                </blockquote>

                {/* Author Info */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4">
                    {/* Avatar Initials */}
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#EA580C] to-amber-500 text-white font-extrabold text-base flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
                      {current.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base sm:text-lg font-['Outfit']">
                        {current.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        {current.role}
                      </p>
                    </div>
                  </div>

                  {/* Slide Counter */}
                  <div className="text-xs font-extrabold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full hidden sm:block">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 h-2.5 bg-gradient-to-r from-[#EA580C] to-amber-400 shadow-sm'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Hint */}
          <div className="text-center mt-4 text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
            <span>
              {isPaused ? 'Paused on hover' : 'Auto-sliding every 5s • Swipe on mobile or click arrows'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
