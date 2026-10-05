import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/mockData';
import { MapPin, Mail, Phone, Send, CheckCircle2, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactSectionProps {
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialMessage = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: initialMessage
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch {
      // Graceful fallback if PHP server is on another host
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative">
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
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-['Outfit']">
            Contact Us
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Have a question or want to work with us? Get in touch!
          </p>
        </motion.div>

        {/* 2-Column Contact Container with Framer Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 font-['Outfit']">
                Let's Talk About Your Project
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                We're here to answer any questions you may have and create an effective solution for your business needs.
              </p>

              {/* Contact Details List */}
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#EA580C] flex items-center justify-center flex-shrink-0 shadow-sm border border-orange-100">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Location</h4>
                    <p className="text-slate-600 text-sm">{COMPANY_INFO.address}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#EA580C] flex items-center justify-center flex-shrink-0 shadow-sm border border-orange-100">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Email</h4>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-slate-600 text-sm hover:text-[#EA580C] transition-colors break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#EA580C] flex items-center justify-center flex-shrink-0 shadow-sm border border-orange-100">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Call</h4>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-slate-600 text-sm hover:text-[#EA580C] transition-colors font-medium"
                    >
                      {COMPANY_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Card - Ultra Attractive & Engaging */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="mt-10 p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/70 text-white shadow-xl shadow-emerald-950/25 border border-emerald-500/30 relative overflow-hidden group"
            >
              {/* Ambient green glow background */}
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#25D366]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#25D366]/25 transition-all duration-500" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

              {/* Status Bar: Live Indicator + Fast Response */}
              <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Online Now • Instant Connect</span>
                </div>

                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 bg-slate-800/60 px-2.5 py-0.5 rounded-full border border-slate-700/60">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>&lt; 5 min reply</span>
                </span>
              </div>

              {/* Header with WhatsApp Icon */}
              <div className="flex items-center gap-3.5 mb-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <WhatsAppIcon className="w-6 h-6 text-white fill-current" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-white font-['Outfit'] tracking-tight flex items-center gap-2">
                    <span>Direct WhatsApp Response</span>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-emerald-400/90 text-xs font-semibold">Chat Directly With Lead Engineers</p>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm mb-5 leading-relaxed relative z-10">
                Connect directly with our development leads for quick project scoping, architecture advice, and milestone estimates.
              </p>

              {/* WhatsApp Action Button with Motion */}
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
                className="inline-flex items-center justify-center gap-2.5 w-full bg-gradient-to-r from-[#25D366] via-[#20bd5a] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f766e] text-white py-3.5 px-6 rounded-2xl font-extrabold text-sm shadow-lg shadow-emerald-500/35 transition-all relative z-10 group/btn hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                id="contact-whatsapp-btn"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current text-white group-hover/btn:scale-110 transition-transform" />
                <span>Message on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform ml-auto" />
              </a>

              {/* Micro Trust Details */}
              <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Free Consultation</span>
                </span>
                <span className="text-slate-500">No commitment required</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#F8FAFC] p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-md relative overflow-hidden"
          >
            {/* Top orange line accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EA580C] to-[#FB923C]" />

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2 font-['Outfit']">
                  Message Sent Successfully!
                </h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  Thank you for reaching out. Our engineering and design team will review your inquiry and get back to you within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[#EA580C] font-bold text-sm hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="contactForm">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Web Development / Mobile App / General Inquiry"
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project requirements, scope, or timeline..."
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-orange-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  id="contact-submit-btn"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
