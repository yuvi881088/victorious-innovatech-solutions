import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { TECH_STACK_DATA } from '../data/mockData';

export function TechStackSection() {
  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-slate-400 uppercase tracking-widest font-semibold text-sm"
        >
          Powered By Modern Technologies
        </motion.p>
      </div>
      
      {/* Marquee Container */}
      <div className="flex w-full overflow-hidden relative">
        {/* Left and Right Gradients for smooth fade out */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap gap-16 items-center"
        >
          {/* We duplicate the list to make the loop seamless */}
          {[...TECH_STACK_DATA, ...TECH_STACK_DATA, ...TECH_STACK_DATA].map((tech, index) => {
            const IconComponent = (Icons as any)[tech.iconName] || Icons.Code;
            
            return (
              <div key={`${tech.name}-${index}`} className="flex items-center space-x-3 group">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
