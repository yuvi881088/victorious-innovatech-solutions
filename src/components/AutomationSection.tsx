import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Database, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Layers,
  Bot
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface AutomationSectionProps {
  onNavigateToContact?: () => void;
}

const PIPELINE_STEPS = [
  {
    step: 1,
    title: 'Trigger Event',
    tag: 'Web Inquiry / Order',
    icon: MessageSquare,
    color: 'from-orange-500 to-amber-500',
    description: 'New lead submitted on website or external webhook received.'
  },
  {
    step: 2,
    title: 'AI Processing',
    tag: 'Smart Classification',
    icon: Bot,
    color: 'from-blue-500 to-cyan-500',
    description: 'AI analyzes requirement, estimates budget range, and assigns urgency score.'
  },
  {
    step: 3,
    title: 'Instant Alert',
    tag: 'WhatsApp & Email',
    icon: WhatsAppIcon,
    color: 'from-emerald-500 to-teal-500',
    description: 'Engineering team receives instant WhatsApp & admin email notifications in < 1 second.'
  },
  {
    step: 4,
    title: 'Sync & Backup',
    tag: 'CRM & DB Automation',
    icon: Database,
    color: 'from-purple-500 to-indigo-500',
    description: 'Lead auto-synced to CRM, CSV backup recorded, and automated client reply sent.'
  }
];

export const AutomationSection: React.FC<AutomationSectionProps> = ({ onNavigateToContact }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timeoutsRef = React.useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const startSimulation = () => {
    if (isRunning) return;
    clearAllTimeouts();
    setIsRunning(true);
    setActiveStep(1);

    const stepTime = 1200;
    const t1 = setTimeout(() => setActiveStep(2), stepTime);
    const t2 = setTimeout(() => setActiveStep(3), stepTime * 2);
    const t3 = setTimeout(() => setActiveStep(4), stepTime * 3);
    const t4 = setTimeout(() => {
      setActiveStep(5); // Marks Stage 4 as Completed
      setIsRunning(false);
    }, stepTime * 4);

    timeoutsRef.current = [t1, t2, t3, t4];
  };

  const resetSimulation = () => {
    clearAllTimeouts();
    setIsRunning(false);
    setActiveStep(0);
  };

  React.useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  return (
    <section id="automation" className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Intelligent Software Automation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-['Outfit']"
          >
            Automate Your Business Workflows
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Replace repetitive manual work with custom background bots, CRM/ERP synchronization, and 24/7 automated pipelines.
          </motion.p>
        </div>

        {/* Interactive Live Pipeline Simulator */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md mb-16 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] flex items-center gap-2">
                <span>Live Automation Simulator</span>
                <Sparkles className="w-5 h-5 text-amber-400" />
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Click "Run Simulation" to watch an automated workflow execute in real time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EA580C] to-orange-500 hover:from-[#C2410C] hover:to-orange-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isRunning ? 'Processing...' : activeStep === 5 ? 'Re-run Simulation' : 'Run Simulation'}</span>
              </button>

              <button
                onClick={resetSimulation}
                title="Reset simulation"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Pipeline Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {PIPELINE_STEPS.map((item) => {
              const Icon = item.icon;
              const isCurrent = activeStep === item.step;
              const isDone = activeStep > item.step;

              return (
                <motion.div
                  key={item.step}
                  animate={{
                    borderColor: isCurrent ? '#06b6d4' : isDone ? '#10b981' : '#334155',
                    scale: isCurrent ? 1.03 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  className={`relative p-5 rounded-2xl bg-slate-950/80 border transition-all duration-300 flex flex-col justify-between ${
                    isCurrent ? 'shadow-xl shadow-cyan-500/20' : ''
                  }`}
                >
                  {/* Step Number & Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                      Stage 0{item.step}
                    </span>

                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    ) : isCurrent ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 px-2 py-0.5 rounded-full animate-pulse">
                        <Zap className="w-3 h-3" />
                        <span>Running</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">Idle</span>
                    )}
                  </div>

                  {/* Icon with gradient badge */}
                  <div className="mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md mb-3`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-extrabold text-base text-white font-['Outfit']">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-cyan-400/90 block mb-2">
                      {item.tag}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Progress Indicator line */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                    <motion.div
                      className={`h-full ${isDone ? 'bg-emerald-500' : isCurrent ? 'bg-cyan-400 animate-pulse' : 'bg-transparent'}`}
                      initial={{ width: 0 }}
                      animate={{ width: isDone ? '100%' : isCurrent ? '70%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#EA580C] flex items-center justify-center mb-4 border border-orange-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-lg text-white mb-2 font-['Outfit']">
              Zero Manual Data Entry
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Eliminate copy-pasting between spreadsheets, CRMs, and email inboxes with seamless bidirectional sync.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-lg text-white mb-2 font-['Outfit']">
              24/7 Autonomous Execution
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Background workers and webhook listeners run non-stop with zero human intervention or operational downtime.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-lg text-white mb-2 font-['Outfit']">
              100% Reliable & Backed Up
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every automated action is logged to MySQL and backed up to CSV files with automated failover handling.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={onNavigateToContact}
            className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-xl shadow-orange-600/30 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Request a Custom Automation Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
