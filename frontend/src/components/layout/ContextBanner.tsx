import React from 'react';
import { useSession } from '../../context/SessionContext';
import { MapPin, Globe, Shield } from 'lucide-react';

export const ContextBanner: React.FC = () => {
  const { currentScenario, currentLanguage, proficiency } = useSession();

  if (!currentScenario) return null;

  const { persona } = currentScenario;

  // Visual avatar color depending on avatar seed
  const getAvatarColor = (seed: string) => {
    switch (seed) {
      case 'karan': return 'from-amber-400/20 to-red-500/20 text-amber-300 border-amber-500/20';
      case 'ramesh': return 'from-purple-400/20 to-indigo-500/20 text-purple-300 border-purple-500/20';
      case 'shruti': return 'from-cyan-400/20 to-blue-500/20 text-cyan-300 border-cyan-500/20';
      case 'babubhai': return 'from-emerald-400/20 to-teal-500/20 text-emerald-300 border-emerald-500/20';
      default: return 'from-zinc-500/20 to-slate-600/20 text-zinc-300 border-zinc-500/20';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
      case 'Medium': return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
      case 'Hard': return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
      default: return 'text-zinc-400 border-white/5 bg-white/5';
    }
  };

  return (
    <div className="w-full bg-zinc-950/70 backdrop-blur-xl border-b border-white/5 p-4 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Persona Identity Info */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${getAvatarColor(persona.avatarSeed)} border flex items-center justify-center font-bold text-lg shadow-sm shrink-0`}>
            {persona.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Immersion Partner</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-ring" />
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Live Roleplay</span>
            </div>
            <h2 className="text-lg font-extrabold text-white leading-tight flex items-center gap-2">
              {persona.name}
              <span className="text-xs font-normal text-zinc-400">({persona.role})</span>
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                {persona.location}
              </span>
            </div>
          </div>
        </div>

        {/* Mid Panel: Scenario Description */}
        <div className="hidden lg:block flex-1 max-w-md bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-zinc-400 leading-relaxed shadow-inner">
          <span className="text-[9px] uppercase font-bold text-indigo-400 block mb-0.5">Scenario Mission</span>
          {currentScenario.description}
        </div>

        {/* Session Stats (Language, Proficiency, Difficulty) */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-0 pt-3 md:pt-0">
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500">Active Language</span>
            <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 mt-0.5">
              <Globe className="w-3.5 h-3.5" />
              {currentLanguage}
            </span>
          </div>

          <div className="h-8 w-px bg-white/10 hidden md:block" />

          <div className="flex flex-col items-start md:items-end">
            <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500">Target Level</span>
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 mt-0.5">
              <Shield className="w-3.5 h-3.5 text-zinc-500" />
              {proficiency}
            </span>
          </div>

          <div className="h-8 w-px bg-white/10 hidden md:block" />

          <div className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${getDifficultyColor(currentScenario.difficulty)}`}>
            {currentScenario.difficulty}
          </div>
        </div>

      </div>
    </div>
  );
};
