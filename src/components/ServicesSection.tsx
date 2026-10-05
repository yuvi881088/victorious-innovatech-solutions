import React from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data/mockData';
import { 
  Code2, 
  Palette, 
  Smartphone, 
  ShoppingCart, 
  TrendingUp, 
  Cloud, 
  ArrowRight, 
  CheckCircle,
  Search,
  Sparkles,
  Cpu
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onNavigateToContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onNavigateToContact }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LaptopCode':
        return <Code2 className="w-8 h-8" />;
      case 'Cpu':
        return <Cpu className="w-8 h-8" />;
      case 'Palette':
        return <Palette className="w-8 h-8" />;
      case 'Smartphone':
        return <Smartphone className="w-8 h-8" />;
      case 'Search':
        return <Search className="w-8 h-8" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-8 h-8" />;
      case 'Bullhorn':
        return <TrendingUp className="w-8 h-8" />;
      case 'Cloud':
        return <Cloud className="w-8 h-8" />;
      default:
        return <Code2 className="w-8 h-8" />;
    }
  };

  const getServiceBadge = (id: string) => {
    switch (id) {
      case 'web-dev':
        return 'Next.js & React';
      case 'software-automation':
        return 'AI & Automation';
      case 'android-apps':
        return 'Android & Kotlin';
      case 'seo-aeo':
        return 'AI & AEO Ready';
      case 'digital-marketing':
        return 'High ROAS';
      case 'ui-ux':
        return 'UI/UX & E-Commerce';
      default:
        return null;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F8FAFC] relative overflow-hidden">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 text-[#EA580C] bg-orange-100/80 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>What We Do</span>
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-['Outfit']">
            Our Core Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From native Android apps and full-stack web platforms to next-gen SEO, AEO, and high-ROI digital marketing.
          </p>
        </motion.div>

        {/* 6 Services Grid with Framer Motion stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, index) => {
            const badge = getServiceBadge(service.id);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectService(service.id)}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-orange-200/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                id={`service-card-${service.id}`}
              >
                {/* Subtle top border highlight on hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EA580C] to-[#FB923C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-start justify-between mb-6">
                    {/* Service Icon with motion bounce */}
                    <motion.div 
                      whileHover={{ rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 0.4 }}
                      className="w-16 h-16 rounded-2xl bg-orange-50 text-[#EA580C] flex items-center justify-center group-hover:bg-[#EA580C] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm"
                    >
                      {getIcon(service.iconName)}
                    </motion.div>

                    {/* Tag / Badge */}
                    {badge && (
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-[#EA580C] transition-colors">
                        {badge}
                      </span>
                    )}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-[#EA580C] transition-colors font-['Outfit']">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Feature Highlights */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle className="w-4 h-4 text-[#EA580C] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[#EA580C] text-sm font-bold">
                  <span className="group-hover:underline">Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 font-['Outfit']">
              Need a Custom Tailored Digital Solution?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              Connect with our technical leads in Indore to scope your architecture, timeline, and deliverables.
            </p>
          </div>
          <button
            onClick={onNavigateToContact}
            className="bg-[#EA580C] hover:bg-[#C2410C] text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
            id="services-get-quote-btn"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
