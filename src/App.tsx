import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechStackSection } from './components/TechStackSection';
import { ServicesSection } from './components/ServicesSection';
import { AutomationSection } from './components/AutomationSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { CareersSection } from './components/CareersSection';
import { LeadershipSection } from './components/LeadershipSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ServiceModal } from './components/ServiceModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ChatAssistant } from './components/ChatAssistant';
import { PORTFOLIO_DATA } from './data/mockData';

export default function App({ initialSection }: { initialSection?: string } = {}) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_DATA[0] | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>(null);
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');

  const navigateToSection = (sectionId: string) => {
    const targetId = sectionId === 'home' ? 'top' : sectionId;
    if (targetId === 'top' || targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      if (window.history.pushState) {
        window.history.pushState(null, '', '/');
      }
      return;
    }

    const element = document.getElementById(targetId) || document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
      window.scrollBy(0, -80);
      if (window.history.pushState) {
        window.history.pushState(null, '', `/${sectionId}`);
      }
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      const pathSection = window.location.pathname.replace(/^\/|\/$/g, '');
      const hashSection = window.location.hash.replace('#', '');
      const target = initialSection || hashSection || pathSection;

      if (target && target !== '' && target !== 'index.html' && target !== 'home') {
        navigateToSection(target);
        const raf = requestAnimationFrame(() => navigateToSection(target));
        const t1 = setTimeout(() => navigateToSection(target), 50);
        const t2 = setTimeout(() => navigateToSection(target), 150);
        const t3 = setTimeout(() => navigateToSection(target), 300);
        return () => {
          cancelAnimationFrame(raf);
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      }
    }
  }, [initialSection]);

  const handleSelectServiceFromCard = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleNavigateToContactWithMessage = (msg?: string) => {
    if (msg) {
      setContactInitialMessage(msg);
    }
    navigateToSection('contact');
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-['Outfit',sans-serif] selection:bg-orange-500 selection:text-white">
      {/* Framer Motion Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EA580C] via-[#FB923C] to-amber-400 origin-left z-[9999] shadow-sm shadow-orange-500/50"
        style={{ scaleX }}
      />

      {/* 1. Header Navigation */}
      <Header onNavigateToSection={navigateToSection} />

      {/* Main Website Sections */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero 
          onNavigateToSection={navigateToSection} 
          onSelectService={handleSelectServiceFromCard} 
        />

        {/* Tech Stack Marquee */}
        <TechStackSection />

        {/* 3. Services Section */}
        <ServicesSection 
          onSelectService={handleSelectServiceFromCard} 
          onNavigateToContact={() => handleNavigateToContactWithMessage()} 
        />

        {/* 3.1 Software Automation & AI Workflows */}
        <AutomationSection 
          onNavigateToContact={() => handleNavigateToContactWithMessage('I would like to inquire about Software Automation services.')}
        />

        {/* 4. Portfolio Section */}
        <PortfolioSection 
          onSelectProject={(proj) => setSelectedProject(proj)} 
        />

        {/* Client Testimonials */}
        <TestimonialsSection />

        {/* 5. Experience Section */}
        <ExperienceSection />

        {/* Live Stats */}
        <StatsSection />

        {/* 6. About Section */}
        <AboutSection 
          onNavigateToContact={() => handleNavigateToContactWithMessage()} 
        />

        {/* Careers Section */}
        <CareersSection 
          onNavigateToContact={() => handleNavigateToContactWithMessage('I would like to apply for an open position.')}
        />

        {/* 7. CEO & Leadership Team Section */}
        <LeadershipSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* 8. Contact Us Section */}
        <ContactSection 
          key={contactInitialMessage}
          initialMessage={contactInitialMessage} 
        />
      </main>

      {/* 9. Footer */}
      <Footer 
        onNavigateToSection={navigateToSection} 
        onOpenPolicy={setSelectedPolicy}
      />

      {/* Floating WhatsApp Quick Action with subtle entry animation */}
      <FloatingWhatsApp />

      {/* Intelligent Chatbot Assistant with Framer Motion animations */}
      <ChatAssistant onNavigateToSection={navigateToSection} />

      {/* Modals */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onNavigateToContact={() => {
          if (selectedProject) {
            handleNavigateToContactWithMessage(`I saw your case study for "${selectedProject.title}" and would like to build something similar for our business.`);
          }
        }} 
      />

      <ServiceModal 
        serviceId={selectedServiceId} 
        onClose={() => setSelectedServiceId(null)} 
        onNavigateToContact={() => {
          handleNavigateToContactWithMessage();
        }} 
      />

      <PolicyModal
        policyType={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
      />
    </div>
  );
}
