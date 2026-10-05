import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LEADERSHIP_DATA } from '../data/mockData';
import { Quote } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  const { ceo, leaders } = LEADERSHIP_DATA;

  // Custom image fallback tracker for CEO
  const [ceoImgSrc, setCeoImgSrc] = useState(ceo.image);
  const [ceoAttempt, setCeoAttempt] = useState(0);

  const handleCeoImgError = () => {
    if (ceoAttempt === 0 && ceo.localImage) {
      setCeoAttempt(1);
      setCeoImgSrc(ceo.localImage);
    } else {
      setCeoImgSrc(ceo.fallbackImage);
    }
  };

  const LeaderImage: React.FC<{ leader: typeof leaders[0] }> = ({ leader }) => {
    const [imgSrc, setImgSrc] = useState(leader.image);
    const [attempt, setAttempt] = useState(0);

    const handleError = () => {
      if (attempt === 0 && leader.localImage) {
        setAttempt(1);
        setImgSrc(leader.localImage);
      } else {
        setImgSrc(leader.fallbackImage);
      }
    };

    return (
      <img
        src={imgSrc}
        alt={leader.name}
        onError={handleError}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    );
  };

  return (
    <section id="team" className="py-20 md:py-28 bg-[#F8FAFC] relative">
      <div id="ceo-section" className="absolute top-0 left-0" />
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
            Vision & Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-['Outfit']">
            {LEADERSHIP_DATA.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {LEADERSHIP_DATA.subtitle}
          </p>
        </motion.div>

        {/* CEO Spotlight Card with Framer Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 mb-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative overflow-hidden"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-64 h-64 bg-orange-100/60 rounded-full blur-3xl pointer-events-none -z-0" 
          />

          {/* CEO Photo */}
          <div className="relative flex-shrink-0 z-10">
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-800">
              <img
                src={ceoImgSrc}
                alt={ceo.name}
                onError={handleCeoImgError}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-[#EA580C] text-white p-3 rounded-xl shadow-lg">
              <Quote className="w-5 h-5" />
            </div>
          </div>

          {/* CEO Message */}
          <div className="flex-1 text-center lg:text-left z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 font-['Outfit']">
              Message from Our CEO
            </h3>
            <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed mb-6 font-medium">
              "{ceo.message}"
            </p>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
                {ceo.name}
              </h4>
              <p className="text-[#EA580C] font-bold text-sm uppercase tracking-wider">
                {ceo.role}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Leadership Team Grid with Framer Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 group"
              id={`leader-card-${idx}`}
            >
              {/* Leader Photo */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-slate-100 flex-shrink-0 bg-slate-800">
                <LeaderImage leader={leader} />
              </div>

              {/* Leader Info */}
              <div className="text-center sm:text-left flex-1">
                <h4 className="text-xl font-bold text-slate-900 mb-1 font-['Outfit']">
                  {leader.name}
                </h4>
                <p className="text-[#EA580C] font-bold text-xs sm:text-sm uppercase tracking-wider mb-3">
                  {leader.role}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {leader.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
