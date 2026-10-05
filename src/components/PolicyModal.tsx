import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | null;

interface PolicyModalProps {
  policyType: PolicyType;
  onClose: () => void;
}

export function PolicyModal({ policyType, onClose }: PolicyModalProps) {
  if (!policyType) return null;

  const getPolicyContent = () => {
    if (policyType === 'privacy') {
      return {
        title: 'Privacy Policy',
        icon: <ShieldCheck className="w-6 h-6 text-[#EA580C]" />,
        content: (
          <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h4 className="text-lg font-bold text-slate-900 mt-6">1. Introduction</h4>
            <p>Welcome to Victorious Innovatech Solutions. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
            
            <h4 className="text-lg font-bold text-slate-900 mt-6">2. The Data We Collect</h4>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Identity Data includes first name, last name, username or similar identifier.</li>
              <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
              <li>Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
            </ul>

            <h4 className="text-lg font-bold text-slate-900 mt-6">3. How We Use Your Data</h4>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            </ul>

            <h4 className="text-lg font-bold text-slate-900 mt-6">4. Data Security</h4>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.</p>
            
            <h4 className="text-lg font-bold text-slate-900 mt-6">5. Contact Us</h4>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us via our contact form.</p>
          </div>
        )
      };
    }

    if (policyType === 'terms') {
      return {
        title: 'Terms & Conditions',
        icon: <FileText className="w-6 h-6 text-[#EA580C]" />,
        content: (
          <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h4 className="text-lg font-bold text-slate-900 mt-6">1. Acceptance of Terms</h4>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
            
            <h4 className="text-lg font-bold text-slate-900 mt-6">2. Intellectual Property</h4>
            <p>The Site and its original content, features and functionality are owned by Victorious Innovatech Solutions and are protected by international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws.</p>
            
            <h4 className="text-lg font-bold text-slate-900 mt-6">3. Use License</h4>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Victorious Innovatech Solutions' website for personal, non-commercial transitory viewing only.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on the website;</li>
            </ul>

            <h4 className="text-lg font-bold text-slate-900 mt-6">4. Limitations</h4>
            <p>In no event shall Victorious Innovatech Solutions or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.</p>
          </div>
        )
      };
    }

    return null;
  };

  const content = getPolicyContent();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="px-6 py-4 sm:px-8 sm:py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                {content?.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{content?.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 sm:p-8 overflow-y-auto flex-grow custom-scrollbar">
            {content?.content}
          </div>

          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#EA580C] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#C2410C] transition-colors cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
