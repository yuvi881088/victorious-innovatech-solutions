import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/mockData';
import { ExternalLink } from 'lucide-react';

interface PortfolioSectionProps {
  onSelectProject: (project: typeof PORTFOLIO_DATA[0]) => void;
}

const ProjectImage: React.FC<{ project: typeof PORTFOLIO_DATA[0] }> = ({ project }) => {
  const [imgSrc, setImgSrc] = useState(project.image);
  const [attempt, setAttempt] = useState(0);

  const handleError = () => {
    if (attempt === 0 && project.localImage) {
      setAttempt(1);
      setImgSrc(project.localImage);
    } else {
      setImgSrc(project.fallbackImage);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={project.title}
      onError={handleError}
      className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
      loading="lazy"
    />
  );
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'app' | 'ecommerce'>('all');

  const filteredProjects = activeFilter === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-[#EA580C] text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-['Outfit']">
            Our Portfolio
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Check out some of our recent projects and creative work
          </p>
        </motion.div>

        {/* Filter Capsule Tabs with Framer Motion layoutId pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {[
            { id: 'all', label: 'All' },
            { id: 'web', label: 'Web Design' },
            { id: 'app', label: 'App Development' },
            { id: 'ecommerce', label: 'E-commerce' }
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                }`}
                id={`portfolio-filter-${tab.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#EA580C] to-[#FB923C] shadow-md shadow-orange-500/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Portfolio 6 Items Grid with Framer Motion layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => onSelectProject(project)}
                className="group bg-slate-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer border border-slate-100 relative"
                id={`portfolio-card-${project.id}`}
              >
                {/* Image Container with 4:3 ratio */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <ProjectImage project={project} />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Category Pill on top right */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-[#EA580C] text-white text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Hover Quick Overlay Details */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                    <h3 className="text-xl sm:text-2xl font-black mb-1 font-['Outfit'] tracking-tight group-hover:text-orange-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/15">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-white/15 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="ml-auto bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-transform hover:scale-105 shadow-md"
                          title="Open Live Website in New Tab"
                        >
                          <span>Visit Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <div className="ml-auto text-orange-400 font-bold text-xs flex items-center gap-1">
                          <span>View Case</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
