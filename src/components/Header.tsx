import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { Menu, X, Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', path: '/', sectionId: 'home' },
    { label: 'Services', path: '/services', sectionId: 'services' },
    { label: 'Portfolio', path: '/portfolio', sectionId: 'portfolio' },
    { label: 'Experience', path: '/experience', sectionId: 'experience' },
    { label: 'About', path: '/about', sectionId: 'about' },
    { label: 'Team', path: '/team', sectionId: 'team' },
    { label: 'Contact', path: '/contact', sectionId: 'contact' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      const hash = window.location.hash.replace('#', '');
      const initial = hash || path;
      if (initial && initial !== 'index.html') {
        setActiveSection(initial);
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // If at top of page
      if (window.scrollY < 80) {
        setActiveSection('home');
        return;
      }

      // If scrolled near bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contact');
        return;
      }

      const sections = [
        { id: 'home', altId: 'top' },
        { id: 'services' },
        { id: 'portfolio' },
        { id: 'experience' },
        { id: 'about' },
        { id: 'team', altId: 'ceo-section' },
        { id: 'contact' },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        const el = document.getElementById(s.id) || (s.altId ? document.getElementById(s.altId) : null);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(item.sectionId);

    const targetId = item.sectionId;
    const element = document.getElementById(targetId) || (targetId === 'home' ? document.getElementById('top') : null);

    if (element) {
      if (onNavigateToSection) {
        onNavigateToSection(item.sectionId);
      } else {
        const topOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'instant' as ScrollBehavior,
        });
      }

      if (window.history.pushState) {
        window.history.pushState(null, '', item.path);
      }
    } else {
      window.location.href = item.path;
    }
  };

  const isItemActive = (item: typeof navItems[0]) => {
    return activeSection === item.sectionId;
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80' 
          : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="/" 
          onClick={(e) => {
            const homeEl = document.getElementById('home') || document.getElementById('top');
            if (homeEl) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
              setActiveSection('home');
              if (window.history.pushState) window.history.pushState(null, '', '/');
            }
          }}
          className="flex items-center gap-2 group cursor-pointer text-decoration-none"
          id="header-brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#FB923C] flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            V
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-['Outfit']">
            Victorious<span className="text-[#EA580C]">Innovatech</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <a
                key={item.sectionId}
                href={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  active
                    ? 'text-[#EA580C] font-bold bg-orange-50/90 shadow-sm ring-1 ring-orange-200/60'
                    : 'text-slate-700 hover:text-[#EA580C] hover:bg-slate-50'
                }`}
                id={`nav-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Contact */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#EA580C] px-3 py-2 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4 text-[#EA580C]" />
            <span>{COMPANY_INFO.phoneFormatted}</span>
          </a>
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
              const text = encodeURIComponent("Hello Victorious Innovatech Solutions, I would like to inquire about your services.");
              const targetUrl = isMobile
                ? `https://api.whatsapp.com/send?phone=917970292029&text=${text}`
                : `https://web.whatsapp.com/send?phone=917970292029&text=${text}`;
              window.open(targetUrl, '_blank', 'noopener,noreferrer');
            }}
            className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            id="header-whatsapp-cta"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-slate-200 px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <a
                  key={item.sectionId}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-left py-2.5 px-3 rounded-lg text-base font-semibold transition-all cursor-pointer ${
                    active
                      ? 'text-[#EA580C] bg-orange-50 font-bold ring-1 ring-orange-200/60'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  id={`mobile-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                  const text = encodeURIComponent("Hello Victorious Innovatech Solutions, I would like to inquire about your services.");
                  const targetUrl = isMobile
                    ? `https://api.whatsapp.com/send?phone=917970292029&text=${text}`
                    : `https://web.whatsapp.com/send?phone=917970292029&text=${text}`;
                  window.open(targetUrl, '_blank', 'noopener,noreferrer');
                }}
                className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-center py-3 rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full border border-slate-200 text-slate-800 text-center py-3 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#EA580C]" />
                <span>Call {COMPANY_INFO.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
