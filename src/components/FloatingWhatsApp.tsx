import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const text = encodeURIComponent("Hello Victorious Innovatech Solutions, I would like to inquire about your services.");
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const targetUrl = isMobile
      ? `https://api.whatsapp.com/send?phone=917970292029&text=${text}`
      : `https://web.whatsapp.com/send?phone=917970292029&text=${text}`;
    
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside
      aria-label="Quick WhatsApp contact"
      className="fixed bottom-6 left-6 sm:left-auto sm:right-24 z-50 flex items-center"
    >
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20"
        id="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp (+91 7970292029)"
      >
        <WhatsAppIcon className="w-5 h-5 fill-current text-white flex-shrink-0" />
        <span className="font-bold text-xs tracking-wide pr-1">
          WhatsApp
        </span>
      </a>
    </aside>
  );
};

