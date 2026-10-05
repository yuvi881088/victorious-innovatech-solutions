import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_DATA } from '../data/mockData';
import { Briefcase, Users, Handshake } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-10 h-10" />;
      case 'Users':
        return <Users className="w-10 h-10" />;
      case 'Handshake':
        return <Handshake className="w-10 h-10" />;
      default:
        return <Briefcase className="w-10 h-10" />;
    }
  };

  return (
    <section id="experience" className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Decorative Ambient Glow with Framer Motion */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-orange-400/20 to-amber-300/20 rounded-full blur-[140px] pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[#EA580C] text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2"
          >
            Proven Track Record
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-['Outfit']">
            Our Experience
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Over 3+ years of delivering quality solutions and working with industry giants
          </p>
        </motion.div>

        {/* 3 Experience Cards Grid with Framer Motion Spring Physics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {EXPERIENCE_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ 
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: index * 0.15 
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                boxShadow: '0 25px 35px -10px rgba(234, 88, 12, 0.18)' 
              }}
              className="bg-white rounded-3xl p-10 border border-slate-200/80 shadow-sm transition-all duration-300 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden"
              id={`experience-card-${item.id}`}
            >
              {/* Subtle top border highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-[#EA580C] opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon Circle with Spring Hover */}
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 rounded-2xl bg-orange-50 text-[#EA580C] flex items-center justify-center mb-6 group-hover:bg-[#EA580C] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-inner"
              >
                {getIcon(item.iconName)}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-[#EA580C] transition-colors font-['Outfit']">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-base leading-relaxed max-w-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Milestone Highlights with Framer Motion float */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-around gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-[#FB923C] font-['Outfit']">100%</span>
            <span className="text-left text-xs sm:text-sm text-slate-300 leading-tight">Client Satisfaction<br />Rate Delivered</span>
          </div>
          <div className="h-8 w-px bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-[#FB923C] font-['Outfit']">24/7</span>
            <span className="text-left text-xs sm:text-sm text-slate-300 leading-tight">Technical Support<br />& Maintenance</span>
          </div>
          <div className="h-8 w-px bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-[#FB923C] font-['Outfit']">99.9%</span>
            <span className="text-left text-xs sm:text-sm text-slate-300 leading-tight">Uptime Guaranteed<br />For Web Platforms</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
