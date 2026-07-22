import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { mockScenarios } from '../data/mockScenarios';
import type { Scenario, TargetLanguage } from '../types/scenario';
import { PageTransition } from '../components/layout/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Globe, 
  Shield, 
  Activity, 
  Play, 
  MessageSquare,
  Coffee,
  ShoppingBag,
  Briefcase,
  Car,
  UserCheck,
  Sparkles,
  MapPin
} from 'lucide-react';

export const ScenarioSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectScenario } = useSession();
  
  // Default selected scenario: Bengaluru Tech Interview
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    mockScenarios.find(s => s.id === 'job-interview') || mockScenarios[0]
  );
  const [activeLanguage, setActiveLanguage] = useState<TargetLanguage>('English');
  const [activeProficiency, setActiveProficiency] = useState<string>('Intermediate');

  const handleCardClick = (sc: Scenario) => {
    if (!sc) return;
    setSelectedScenario(sc);
    if (sc.targetLanguage && sc.targetLanguage.length > 0) {
      setActiveLanguage(sc.targetLanguage[0]);
    }
  };

  const handleStartSession = () => {
    if (!selectedScenario) return;
    selectScenario(selectedScenario, activeLanguage, activeProficiency);
    navigate('/chat');
  };

  const handleLaunch = handleStartSession;

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'chai-stall':
        return <Coffee className="w-5 h-5 text-[#F4602A]" />;
      case 'market-haggling':
        return <ShoppingBag className="w-5 h-5 text-[#F4602A]" />;
      case 'job-interview':
        return <Briefcase className="w-5 h-5 text-[#F4602A]" />;
      case 'rickshaw-ride':
        return <Car className="w-5 h-5 text-[#F4602A]" />;
      default:
        return <MessageSquare className="w-5 h-5 text-[#F4602A]" />;
    }
  };

  const renderDifficultyTag = (diff?: string) => {
    switch (diff) {
      case 'Easy':
        return (
          <span className="text-emerald-800 text-xs font-semibold bg-emerald-50/90 border border-emerald-200/80 px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Easy
          </span>
        );
      case 'Medium':
        return (
          <span className="text-amber-800 text-xs font-semibold bg-amber-50/90 border border-amber-200/80 px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Medium
          </span>
        );
      case 'Hard':
        return (
          <span className="text-rose-800 text-xs font-semibold bg-rose-50/90 border border-rose-200/80 px-2.5 py-0.5 rounded-md flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            Hard
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col gap-10 flex-grow min-h-screen text-[#18181B] relative">
        
        {/* Header and Navigation */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E4E4E7] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold bg-[#F4602A] text-white shadow-xs">
                <Sparkles className="w-3 h-3 text-white" />
                SARVAM AI STUDIO
              </span>
              <span className="text-zinc-400 text-xs">•</span>
              <span className="text-zinc-500 text-xs font-medium">Authentic Regional Roleplays</span>
            </div>
            
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                className="w-10 h-10 object-contain drop-shadow-xs transition-transform hover:scale-105"
                alt="Conversa Logo"
              />
              <div className="flex flex-col">
                <span className="font-brand font-black text-2xl md:text-3xl tracking-tight text-[#18181B] leading-none">
                  Conversa
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F4602A] mt-1">
                  Immersion Studio
                </span>
              </div>
            </div>
            <p className="text-zinc-500 text-sm mt-2 max-w-xl font-normal leading-relaxed">
              Live roleplay conversations with in-character AI personas. Real-time scenarios, zero distraction, deep coach feedback.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/history')}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 border border-[#E4E4E7] hover:border-zinc-300 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            <History className="w-4 h-4 text-[#F4602A]" />
            Session History Log
          </button>
        </header>

        {/* Main 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scenario Select Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1 mb-1">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 font-mono">
                Select Immersion Arena ({mockScenarios.length})
              </h2>
              <span className="text-xs text-zinc-400 font-mono">Sarvam Neural Voice</span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {mockScenarios.map((sc) => {
                const isSelected = selectedScenario?.id === sc.id;
                
                return (
                  <div
                    key={sc.id}
                    onClick={() => handleCardClick(sc)}
                    className={`linear-card rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col gap-3 relative overflow-hidden ${
                      isSelected
                        ? 'bg-white border-[#F4602A] ring-2 ring-orange-500/20 shadow-md transform scale-[1.01]'
                        : 'bg-white/80 border-[#E4E4E7] hover:border-orange-300 shadow-2xs'
                    }`}
                  >
                    {/* Top Row: Icon + Title + Difficulty Tag */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-2xs ${
                          isSelected ? 'bg-orange-50 border-orange-200' : 'bg-zinc-100 border-zinc-200'
                        }`}>
                          {getScenarioIcon(sc.id)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-extrabold text-[#18181B] tracking-tight m-0">
                              {sc.name}
                            </h3>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-[#F4602A] animate-pulse" />
                            )}
                          </div>
                          <span className="text-xs text-zinc-500 block font-normal mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#F4602A]" />
                            {sc.description ? sc.description.split('.')[0] : ''}
                          </span>
                        </div>
                      </div>

                      {renderDifficultyTag(sc.difficulty)}
                    </div>

                    {/* Meta info tags */}
                    <div className="flex items-center gap-3 pt-2 border-t border-zinc-100 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5 font-medium text-zinc-700">
                        <UserCheck className="w-3.5 h-3.5 text-[#F4602A]" />
                        {sc.persona?.name || 'Persona'} ({sc.persona?.role || 'Role'})
                      </span>
                      <span>•</span>
                      <span className="font-mono text-[11px] text-zinc-400">
                        {sc.targetLanguage ? sc.targetLanguage.join(', ') : ''}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Configuration & Start Studio Box (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E4E4E7] rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-sm sticky top-6">
            
            <div className="border-b border-[#E4E4E7] pb-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F4602A] uppercase tracking-wider mb-1">
                <Activity className="w-4 h-4" />
                Active Configuration
              </div>
              <h3 className="text-xl font-extrabold text-[#18181B] tracking-tight">
                {selectedScenario?.name || 'Scenario'}
              </h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                {selectedScenario?.description || ''}
              </p>
            </div>

            {/* Target Persona Detail Card */}
            <div className="bg-[#FAFAFA] border border-[#E4E4E7] rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F4602A] text-white flex items-center justify-center font-mono font-bold text-sm shadow-2xs">
                  {selectedScenario?.persona?.name ? selectedScenario.persona.name.charAt(0) : 'P'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#18181B] leading-none">
                    {selectedScenario?.persona?.name || 'Persona'}
                  </h4>
                  <span className="text-xs text-zinc-500 mt-1 block">
                    {selectedScenario?.persona?.role || 'Role'}
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-zinc-600 bg-white p-3 rounded-xl border border-zinc-200 italic font-normal">
                "{selectedScenario?.promptGuideline ? selectedScenario.promptGuideline.slice(0, 110) : ''}..."
              </div>
            </div>

            {/* Language Selector */}
            {selectedScenario?.targetLanguage && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono flex items-center justify-between">
                  <span>Select Immersion Language</span>
                  <Globe className="w-3.5 h-3.5 text-[#F4602A]" />
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {selectedScenario.targetLanguage.map((lang) => {
                    const isActive = activeLanguage === lang;
                    return (
                      <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#F4602A] text-white border-[#F4602A] shadow-xs'
                            : 'bg-white text-zinc-700 border-[#E4E4E7] hover:border-zinc-300'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Proficiency Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
                Proficiency Level
              </label>

              <div className="grid grid-cols-3 gap-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                  const isActive = activeProficiency === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => setActiveProficiency(lvl)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                        isActive
                          ? 'bg-[#F4602A] text-white border-[#F4602A] shadow-xs'
                          : 'bg-white text-zinc-700 border-[#E4E4E7] hover:border-zinc-300'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* START IMMERSION STUDIO BUTTON */}
            <button
              onClick={handleStartSession}
              className="w-full bg-[#F4602A] hover:bg-[#d95222] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2 group"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              Start Immersion Studio
            </button>

            {/* Footer Assurance */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-mono">
              <Shield className="w-3.5 h-3.5 text-[#F4602A]" />
              <span>Real-Time Voice STT • Sarvam AI Powered</span>
            </div>

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
