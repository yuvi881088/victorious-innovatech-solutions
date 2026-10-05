import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/mockData';
import { ArrowRight, Sparkles, Award, Users, ShieldCheck, Smartphone, Search, TrendingUp, Code2, Cpu } from 'lucide-react';

interface HeroProps {
  onNavigateToSection: (sectionId: string) => void;
  onSelectService?: (serviceId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToSection, onSelectService }) => {
  const handleBadgeClick = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    } else {
      onNavigateToSection('services');
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-900 text-white min-h-[660px] flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.86), rgba(15, 23, 42, 0.94)), url(/res/hero-bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div id="top" className="absolute top-0 left-0" />
      
      {/* Ambient background glowing orbs with Framer Motion */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.4, 0.25]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-[#EA580C]/25 rounded-full blur-[140px] pointer-events-none" 
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-10 -right-10 w-[400px] h-[400px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Pill Badge with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-orange-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm cursor-default"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FB923C]" />
          <span>Premier Digital Design & Engineering Agency</span>
        </motion.div>

        {/* Hero Headline with Framer Motion */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-['Outfit']"
        >
          Better Solutions For <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400">
            Your Digital Business
          </span>
        </motion.h1>

        {/* Floating Feature Badges for Website Dev, Software Automation, Android, SEO/AEO & Digital Marketing */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8"
        >
          <motion.button
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBadgeClick('web-dev')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 hover:border-blue-400/60 backdrop-blur-md text-xs sm:text-sm text-slate-200 shadow-md cursor-pointer transition-colors"
            title="Click to view Website Development details"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold">Website Development</span>
          </motion.button>

          <motion.button
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            whileHover={{ scale: 1.08, y: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBadgeClick('software-automation')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400/60 backdrop-blur-md text-xs sm:text-sm text-slate-200 shadow-md cursor-pointer transition-colors"
            title="Click to view Software Automation details"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">Software Automation</span>
          </motion.button>

          <motion.button
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBadgeClick('android-apps')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 hover:border-orange-400/60 backdrop-blur-md text-xs sm:text-sm text-slate-200 shadow-md cursor-pointer transition-colors"
            title="Click to view Android & Mobile App details"
          >
            <Smartphone className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-semibold">Android & Mobile Apps</span>
          </motion.button>

          <motion.button
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            whileHover={{ scale: 1.08, y: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBadgeClick('seo-aeo')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 hover:border-amber-400/60 backdrop-blur-md text-xs sm:text-sm text-slate-200 shadow-md cursor-pointer transition-colors"
            title="Click to view SEO & AEO details"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">SEO & AEO (AI Search)</span>
          </motion.button>

          <motion.button
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBadgeClick('digital-marketing')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 hover:border-emerald-400/60 backdrop-blur-md text-xs sm:text-sm text-slate-200 shadow-md cursor-pointer transition-colors"
            title="Click to view Digital Marketing details"
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">Digital Marketing & Growth</span>
          </motion.button>
        </motion.div>

        {/* Hero Subtitle with Framer Motion */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-normal"
        >
          {COMPANY_INFO.subTagline}
        </motion.p>

        {/* Action Buttons with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateToSection('portfolio')}
            className="w-full sm:w-auto bg-[#EA580C] hover:bg-[#C2410C] text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="hero-our-work-btn"
          >
            <span>Our Work</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateToSection('contact')}
            className="w-full sm:w-auto border-2 border-[#FB923C] text-[#FB923C] hover:bg-[#EA580C] hover:text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer bg-white/5 backdrop-blur-sm"
            id="hero-contact-btn"
          >
            <span>Contact Us</span>
          </motion.button>
        </motion.div>

        {/* Quick Highlights / Trust Bar with Framer Motion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-700/60"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2.5 text-slate-300 text-xs sm:text-sm font-medium"
          >
            <Award className="w-4 h-4 text-[#FB923C] flex-shrink-0" />
            <span>3+ Years in Business</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2.5 text-slate-300 text-xs sm:text-sm font-medium"
          >
            <Users className="w-4 h-4 text-[#FB923C] flex-shrink-0" />
            <span>120+ Trusted Clients</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2.5 text-slate-300 text-xs sm:text-sm font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-[#FB923C] flex-shrink-0" />
            <span>250+ Successful Projects</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
