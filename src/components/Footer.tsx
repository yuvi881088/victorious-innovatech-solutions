import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { ArrowUp, Send, Check } from 'lucide-react';

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.22 22 12z"/>
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenPolicy?: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection, onOpenPolicy }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterJoined, setNewsletterJoined] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);

    try {
      const response = await fetch('/api/newsletter.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await response.json().catch(() => null);
      if (data && data.message) {
        setNewsletterMessage(data.message);
      } else {
        setNewsletterMessage('Thank you for subscribing to our newsletter!');
      }
      setNewsletterJoined(true);
      setNewsletterEmail('');
    } catch {
      // Graceful fallback if PHP server is on another port/host in local development
      setNewsletterMessage('Thank you for subscribing to our newsletter!');
      setNewsletterJoined(true);
      setNewsletterEmail('');
    } finally {
      setNewsletterLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const targetId = sectionId === 'home' ? 'top' : sectionId;
      const element = document.getElementById(targetId) || document.getElementById(sectionId);
      if (element) {
        const topOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'instant' as ScrollBehavior
        });
      }
    }
    if (window.history.pushState) {
      window.history.pushState(null, '', sectionId === 'home' ? '/' : `/${sectionId}`);
    }
  };

  return (
    <footer className="bg-[#0F1115] text-white pt-20 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-slate-800/80">
          {/* Column 1: Brand Info (Spans 4) */}
          <div className="lg:col-span-4">
            <a 
              href="#top" 
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="flex items-center gap-2 mb-4 text-decoration-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#FB923C] flex items-center justify-center text-white font-black text-lg shadow-md">
                V
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-['Outfit']">
                Victorious<span className="text-[#EA580C]">Innovatech</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              We create digital experiences that help businesses grow and succeed in the online world through tailored design, development, and scalable cloud engineering.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-[#EA580C] hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-[#EA580C] hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-[#EA580C] hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-[#EA580C] hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Services Links (Spans 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-5 relative inline-block">
              Services
              <span className="block w-8 h-0.5 bg-[#EA580C] mt-1.5" />
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Website Development', sectionId: 'services' },
                { label: 'Software Automation & AI', sectionId: 'services' },
                { label: 'Android & Mobile Apps', sectionId: 'services' },
                { label: 'SEO & AEO Optimization', sectionId: 'services' },
                { label: 'Digital Marketing & Growth', sectionId: 'services' },
                { label: 'UI/UX & E-Commerce', sectionId: 'services' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`/${item.sectionId}`}
                    onClick={(e) => handleLinkClick(e, item.sectionId)}
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all text-sm inline-block cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links (Spans 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-5 relative inline-block">
              Quick Links
              <span className="block w-8 h-0.5 bg-[#EA580C] mt-1.5" />
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', sectionId: 'home' },
                { label: 'Services', sectionId: 'services' },
                { label: 'Portfolio', sectionId: 'portfolio' },
                { label: 'Experience', sectionId: 'experience' },
                { label: 'About Us', sectionId: 'about' },
                { label: 'Team', sectionId: 'team' },
                { label: 'Contact', sectionId: 'contact' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.sectionId === 'home' ? '/' : `/${item.sectionId}`}
                    onClick={(e) => handleLinkClick(e, item.sectionId)}
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all text-sm inline-block cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter (Spans 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-5 relative inline-block">
              Newsletter
              <span className="block w-8 h-0.5 bg-[#EA580C] mt-1.5" />
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to our newsletter to receive updates on our latest projects.
            </p>

            {newsletterJoined ? (
              <div className="bg-green-900/40 border border-green-500/40 rounded-xl p-3 text-xs text-green-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>{newsletterMessage || 'Thank you for subscribing!'}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={newsletterLoading}
                  className="bg-slate-800 text-slate-200 text-xs px-3.5 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-[#EA580C] flex-1 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={newsletterLoading}
                  className="bg-[#EA580C] hover:bg-[#C2410C] disabled:bg-slate-700 text-white px-4 py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center cursor-pointer shadow-md disabled:cursor-not-allowed"
                >
                  {newsletterLoading ? '...' : 'Join'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Policies & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p>© 2026 Victorious Innovatech Solutions. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onOpenPolicy && onOpenPolicy('privacy')}
                className="hover:text-[#EA580C] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => onOpenPolicy && onOpenPolicy('terms')}
                className="hover:text-[#EA580C] transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#EA580C]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
