import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/mockData';
import { X, MessageSquare, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: typeof PORTFOLIO_DATA[0] | null;
  onClose: () => void;
  onNavigateToContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onNavigateToContact }) => {
  if (!project) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
          <img
            src={imgSrc}
            alt={project.title}
            onError={handleError}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-950/70 hover:bg-slate-950 text-white p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="bg-[#EA580C] text-white text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
              {project.categoryLabel}
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 font-['Outfit']">
            {project.title}
          </h3>
          <p className="text-slate-600 text-base leading-relaxed mb-6">
            {project.description}
          </p>

          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Core Technologies & Frameworks
          </h4>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="bg-orange-50 border border-orange-200/60 text-[#EA580C] text-xs font-bold px-3 py-1.5 rounded-xl"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {(project as any).link && (
                <a
                  href={(project as any).link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>
                    {(project as any).link.includes('play.google.com') 
                      ? 'View on Play Store' 
                      : 'Visit Website'}
                  </span>
                </a>
              )}
              <button
                onClick={() => {
                  onClose();
                  onNavigateToContact();
                }}
                className="w-full sm:w-auto bg-[#EA580C] hover:bg-[#C2410C] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss Similar</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto text-slate-600 hover:text-slate-900 text-sm font-semibold py-2 px-4 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
