import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Header } from '../Header';
import { LeadershipSection } from '../LeadershipSection';
import { Footer } from '../Footer';
import { PolicyModal, PolicyType } from '../PolicyModal';
import { FloatingWhatsApp } from '../FloatingWhatsApp';
import { ChatAssistant } from '../ChatAssistant';

export const TeamPage: React.FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-['Outfit',sans-serif] selection:bg-orange-500 selection:text-white">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EA580C] via-[#FB923C] to-amber-400 origin-left z-[9999] shadow-sm shadow-orange-500/50"
        style={{ scaleX }}
      />

      <Header onNavigateToSection={() => {}} />

      <motion.main 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex-grow pt-24"
      >
        {/* Leadership Team Section */}
        <LeadershipSection />
      </motion.main>

      <Footer onNavigateToSection={() => {}} onOpenPolicy={setSelectedPolicy} />
      <FloatingWhatsApp />
      <ChatAssistant onNavigateToSection={() => {}} />

      <PolicyModal
        policyType={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
      />
    </div>
  );
};
