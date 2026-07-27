import React from 'react';
import { useSession } from '../../context/SessionContext';
import { MapPin, Globe, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContextBanner: React.FC = () => {
  const { currentScenario, currentLanguage, proficiency } = useSession();

  if (!currentScenario) return null;

  const { persona } = currentScenario;

  // Visual avatar color depending on avatar seed
  const getAvatarColor = (seed: string) => {
    switch (seed) {
      case 'karan': return 'from-amber-500 via-orange-600 to-red-600 border-amber-300';
      case 'ramesh': return 'from-[#A8562E] via-[#E8A33D] to-[#F4602A] border-amber-300';
      case 'shruti': return 'from-indigo-600 via-purple-600 to-pink-600 border-purple-300';
      case 'babubhai': return 'from-emerald-600 to-teal-700 border-emerald-300';
      default: return 'from-slate-700 to-slate-900 border-slate-300';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hard': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white/85 backdrop-blur-xl border-b border-slate-200/80 p-4 sticky top-0 z-40 shadow-xs"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Persona Identity Info */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${getAvatarColor(persona.avatarSeed)} border-2 flex items-center justify-center font-mono font-bold text-white text-lg shadow-md`}>
              {persona.name.charAt(0)}
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Immersion Partner</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
              <span className="font-mono text-[9px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                Live Roleplay
              </span>
            </div>
            <h2 className="text-lg font-bold font-sans text-slate-900 leading-tight flex items-center gap-2 mt-0.5">
              {persona.name}
              <span className="text-xs font-normal text-slate-500">({persona.role})</span>
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {persona.location}
              </span>
            </div>
          </div>
        </div>

        {/* Mid Panel: Scenario Description */}
        <div className="hidden lg:block flex-1 max-w-md bg-gradient-to-r from-amber-50/60 to-orange-50/40 border border-amber-200/60 rounded-xl px-4 py-2.5 text-xs text-slate-700 shadow-2xs">
          <span className="font-mono text-[10px] uppercase text-amber-900 font-bold block mb-0.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Scenario Mission
          </span>
          {currentScenario.description}
        </div>

        {/* Session Stats (Language, Proficiency, Difficulty) */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t border-slate-200/80 md:border-0 pt-3 md:pt-0">
          <div className="flex flex-col items-start md:items-end">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Language</span>
            <span className="font-mono text-xs font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              {currentLanguage}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden md:block" />

          <div className="flex flex-col items-start md:items-end">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Target Level</span>
            <span className="font-mono text-xs font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              {proficiency}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200 hidden md:block" />

          <div className={`px-3 py-1 rounded-lg border font-mono text-xs font-semibold shadow-2xs ${getDifficultyColor(currentScenario.difficulty)}`}>
            {currentScenario.difficulty}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

