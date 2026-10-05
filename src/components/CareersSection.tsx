import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { CAREERS_DATA } from '../data/mockData';

interface CareersSectionProps {
  onNavigateToContact: () => void;
}

export function CareersSection({ onNavigateToContact }: CareersSectionProps) {
  return (
    <section id="careers" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 relative lg:sticky lg:top-24 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Briefcase className="w-4 h-4" />
              <span>Join Our Team</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
            >
              Build the Future With Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 mb-8"
            >
              We're always looking for talented individuals who are passionate about technology, design, and creating impactful digital experiences.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={onNavigateToContact}
              className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-500 hover:-translate-y-1 transition-all duration-300 flex items-center shadow-lg shadow-slate-200"
            >
              <span>Send Open Application</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="space-y-6">
              {CAREERS_DATA.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-orange-200 transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-orange-500 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex space-x-4 mt-4 md:mt-0 text-sm font-medium text-slate-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1.5" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-6 line-clamp-2">
                    {job.description}
                  </p>
                  <button
                    onClick={onNavigateToContact}
                    className="text-orange-500 font-semibold flex items-center hover:text-orange-600 transition-colors"
                  >
                    Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
