import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { mockScenarios } from '../data/mockScenarios';
import type { Scenario, TargetLanguage } from '../types/scenario';
import { PageTransition } from '../components/layout/PageTransition';
import { History, Globe, Shield, Activity, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScenarioSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectScenario } = useSession();
  
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<TargetLanguage>('Hindi');
  const [activeProficiency, setActiveProficiency] = useState<string>('Intermediate');

  const handleCardClick = (sc: Scenario) => {
    setSelectedScenario(sc);
    // Auto-set the first supported language of this scenario
    if (sc.targetLanguage.length > 0) {
      setActiveLanguage(sc.targetLanguage[0]);
    }
  };

  const handleLaunch = () => {
    if (!selectedScenario) return;
    selectScenario(selectedScenario, activeLanguage, activeProficiency);
    // We navigate to /chat immediately, the ChatPage will trigger the start session greeting
    navigate('/chat');
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
      case 'Medium': return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
      case 'Hard': return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
      default: return 'text-zinc-400 border-white/5 bg-white/5';
    }
  };

  const getAvatarColor = (seed: string) => {
    switch (seed) {
      case 'karan': return 'from-amber-400/20 to-red-500/20 text-amber-300 border-amber-500/20';
      case 'ramesh': return 'from-purple-400/20 to-indigo-500/20 text-purple-300 border-purple-500/20';
      case 'shruti': return 'from-cyan-400/20 to-blue-500/20 text-cyan-300 border-cyan-500/20';
      case 'babubhai': return 'from-emerald-400/20 to-teal-500/20 text-emerald-300 border-emerald-500/20';
      default: return 'from-zinc-500/20 to-slate-600/20 text-zinc-300 border-zinc-500/20';
    }
  };

  // Stagger children layout variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 110,
        damping: 15
      } 
    }
  };

  return (
    <PageTransition>
      <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col justify-center gap-8 flex-grow">
        
        {/* Sleek Minimalist Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-ring" />
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">Conversa Node Live</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white m-0 flex items-center gap-3">
              <img src="/logo.png" className="w-9 h-9 object-contain" alt="Conversa Logo" />
              Conversa <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-normal">Immersion</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-lg leading-relaxed">
              Live roleplay conversations with in-character AI personas. Real-time scenarios, zero distraction, deep coach feedback.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/history')}
            className="text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xl border border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/5 text-zinc-300 hover:text-indigo-400 transition-all duration-300 flex items-center gap-2 self-stretch md:self-auto justify-center cursor-pointer shadow-md active:scale-95"
          >
            <History className="w-4 h-4" />
            Session History
          </button>
        </header>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Scenarios Grid (Left 2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              Available Scenarios
            </h2>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {mockScenarios.map((scenario) => (
                <motion.div
                  key={scenario.id}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => handleCardClick(scenario)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 flex flex-col gap-4 group relative ${
                    selectedScenario?.id === scenario.id
                      ? 'bg-indigo-500/[0.04] border-indigo-500/60 shadow-[0_8px_30px_rgba(99,102,241,0.1)] ring-1 ring-indigo-500/30'
                      : 'bg-zinc-900/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/60'
                  }`}
                >
                  {/* Status Indicator bubble */}
                  {selectedScenario?.id === scenario.id && (
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                  )}

                  {/* Header info */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${getAvatarColor(scenario.persona.avatarSeed)} flex items-center justify-center font-bold border border-white/5 shrink-0 text-base shadow-sm`}>
                        {scenario.persona.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                          {scenario.name}
                        </h3>
                        <span className="text-[11px] text-zinc-500 font-medium">{scenario.persona.name} • {scenario.persona.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed min-h-8">
                    {scenario.description}
                  </p>

                  {/* Meta Tags Footer */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-auto text-[11px] text-zinc-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-zinc-600" />
                      <span>{scenario.targetLanguage.join(' / ')}</span>
                    </div>

                    <div className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${getDifficultyColor(scenario.difficulty)}`}>
                      {scenario.difficulty}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Config & Enter Panel (Right Column - Desktop only) */}
          <div className="hidden lg:flex lg:col-span-1 glass-panel rounded-2xl p-6 md:p-8 flex-col gap-6 relative overflow-hidden shadow-xl">
            
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-white/5 pb-3.5 m-0">
              Session Configuration
            </h2>

            {selectedScenario ? (
              <div className="flex flex-col gap-6">
                
                {/* Selected Scenario Preview */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500">Selected Persona</span>
                  <div className="bg-zinc-950/40 rounded-xl border border-white/5 p-4 flex flex-col gap-1.5 shadow-inner">
                    <span className="text-sm font-bold text-white">{selectedScenario.persona.name}</span>
                    <p className="text-xs text-zinc-400 leading-relaxed italic">
                      "{selectedScenario.persona.bio}"
                    </p>
                  </div>
                </div>

                {/* Target Language Select */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    Target Language
                  </span>
                  <div className="flex gap-2">
                    {selectedScenario.targetLanguage.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang as TargetLanguage)}
                        className={`flex-1 font-semibold text-xs py-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                          activeLanguage === lang
                            ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/10'
                            : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Proficiency */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-indigo-400" />
                    Your Skill Level
                  </span>
                  <div className="flex flex-col gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setActiveProficiency(level)}
                        className={`text-xs font-semibold text-left px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          activeProficiency === level
                            ? 'bg-white/[0.04] border-indigo-500/70 text-white shadow-sm ring-1 ring-indigo-500/20'
                            : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                        }`}
                      >
                        {level}
                        {activeProficiency === level && (
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.8)] animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Launch Button */}
                <button
                  onClick={handleLaunch}
                  className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Launch Session
                </button>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-950/20">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 mb-4 shadow-sm">
                  <Globe className="w-5 h-5 text-zinc-500" />
                </div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Select a Scenario
                </p>
                <p className="text-[11px] text-zinc-500 mt-1 max-w-[200px] leading-relaxed">
                  Choose an arena card from the left panel to configure and launch your immersion training.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Mobile Bottom Sheet Drawer overlay */}
        <AnimatePresence>
          {selectedScenario && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedScenario(null)}
                className="fixed inset-0 bg-black z-40 lg:hidden"
              />

              {/* Bottom Sheet Card */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-white/10 rounded-t-3xl p-6 lg:hidden max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col gap-5"
              >
                {/* Drag Handle indicator */}
                <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto cursor-pointer mb-2 shrink-0" onClick={() => setSelectedScenario(null)} />
                
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Session Configuration
                  </h2>
                  <button 
                    onClick={() => setSelectedScenario(null)}
                    className="text-xs text-zinc-500 hover:text-zinc-300 font-semibold"
                  >
                    Close
                  </button>
                </div>

                {/* Persona Details */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500">Selected Persona</span>
                  <div className="bg-zinc-950/40 rounded-xl border border-white/5 p-4 flex flex-col gap-1 shadow-inner">
                    <span className="text-sm font-bold text-white">{selectedScenario.persona.name}</span>
                    <p className="text-xs text-zinc-400 leading-relaxed italic">
                      "{selectedScenario.persona.bio}"
                    </p>
                  </div>
                </div>

                {/* Target Language Select */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    Target Language
                  </span>
                  <div className="flex gap-2">
                    {selectedScenario.targetLanguage.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang as TargetLanguage)}
                        className={`flex-1 font-semibold text-xs py-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                          activeLanguage === lang
                            ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/10'
                            : 'bg-zinc-950 border-white/5 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Proficiency */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] uppercase font-semibold text-zinc-500 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-indigo-400" />
                    Your Skill Level
                  </span>
                  <div className="flex flex-col gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setActiveProficiency(level)}
                        className={`text-xs font-semibold text-left px-4 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          activeProficiency === level
                            ? 'bg-white/[0.04] border-indigo-500/70 text-white'
                            : 'bg-zinc-950 border-white/5 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {level}
                        {activeProficiency === level && (
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.8)] animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Launch Button */}
                <button
                  onClick={handleLaunch}
                  className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all mt-2 shrink-0"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Launch Session
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};
