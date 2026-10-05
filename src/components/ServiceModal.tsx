import React from 'react';
import { SERVICES_DATA, COMPANY_INFO } from '../data/mockData';
import { X, CheckCircle2, MessageSquare, Sparkles, Check, Layers } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ServiceModalProps {
  serviceId: string | null;
  onClose: () => void;
  onNavigateToContact: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ serviceId, onClose, onNavigateToContact }) => {
  if (!serviceId) return null;
  const service = SERVICES_DATA.find((s) => s.id === serviceId);
  if (!service) return null;

  const technologies = (service as any).technologies || [];
  const benefits = (service as any).benefits || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-slate-100 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Service Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-orange-50 text-[#EA580C] border border-orange-200/60 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Service Details</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 font-['Outfit'] tracking-tight">
          {service.title}
        </h3>

        {/* Full Description */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {service.fullDescription}
        </p>

        {/* Key Capabilities */}
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
          <span>Key Capabilities & Deliverables</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
          {service.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#EA580C] flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Technologies & Frameworks */}
        {technologies.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Technologies & Tools Used</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Expected Business Benefits */}
        {benefits.length > 0 && (
          <div className="mb-6 bg-orange-50/60 border border-orange-200/50 rounded-2xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 mb-2.5">
              Client Outcomes & Business Impact
            </h4>
            <div className="space-y-2">
              {benefits.map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <Check className="w-4 h-4 text-[#EA580C] flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onNavigateToContact();
              }}
              className="w-full sm:w-auto bg-[#EA580C] hover:bg-[#C2410C] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get a Free Quote</span>
            </button>

            <a
              href={`${COMPANY_INFO.whatsappUrl}&text=${encodeURIComponent(`Hello Victorious Innovatech, I am interested in ${service.title}. Could you share more details?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                const text = encodeURIComponent(`Hello Victorious Innovatech, I am interested in ${service.title}. Could you share more details?`);
                const targetUrl = isMobile
                  ? `https://api.whatsapp.com/send?phone=917970292029&text=${text}`
                  : `https://web.whatsapp.com/send?phone=917970292029&text=${text}`;
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
              }}
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto text-slate-500 hover:text-slate-800 text-sm font-semibold py-2 px-4 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
