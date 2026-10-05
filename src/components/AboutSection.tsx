import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ABOUT_DATA } from '../data/mockData';
import { Check, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onNavigateToContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateToContact }) => {
  const [imgSrc, setImgSrc] = useState(ABOUT_DATA.image);
  const [attempt, setAttempt] = useState(0);

  const handleImgError = () => {
    if (attempt === 0 && ABOUT_DATA.localImage) {
      setAttempt(1);
      setImgSrc(ABOUT_DATA.localImage);
    } else {
      setImgSrc(ABOUT_DATA.fallbackImage);
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#EA580C] text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-['Outfit']">
            {ABOUT_DATA.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {ABOUT_DATA.subtitle}
          </p>
        </motion.div>

        {/* 2-Column Content Layout with Framer Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Team Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3]">
              <img
                src={imgSrc}
                alt="Victorious Innovatech Team"
                onError={handleImgError}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>

            {/* Decorative Offset Border */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-full h-full border-2 border-[#EA580C]/30 rounded-3xl -z-10" />
          </motion.div>

          {/* Right Column: About Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6 font-['Outfit']">
              {ABOUT_DATA.heading}
            </h3>

            {ABOUT_DATA.paragraphs.map((p, idx) => (
              <p key={idx} className="text-slate-600 text-base sm:text-lg leading-relaxed mb-4">
                {p}
              </p>
            ))}

            {/* Feature Checklist with Framer Motion Stagger */}
            <div className="space-y-4 my-8">
              {ABOUT_DATA.features.map((feat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <p className="text-slate-700 font-semibold text-base sm:text-lg leading-snug">
                    {feat}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Get In Touch Button with Framer Motion physics */}
            <div>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateToContact}
                className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-orange-600/25 transition-all inline-flex items-center gap-2 cursor-pointer"
                id="about-get-in-touch-btn"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
