import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { mockScenarios } from '../data/mockScenarios';
import type { Scenario, TargetLanguage } from '../types/scenario';
import { PageTransition } from '../components/layout/PageTransition';
import { History, Globe, Shield, Activity, Play } from 'lucide-react';

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
      case 'Easy': return 'text-neon-green border-neon-green/30 bg-neon-green/10';
      case 'Medium': return 'text-neon-amber border-neon-amber/30 bg-neon-amber/10';
      case 'Hard': return 'text-neon-magenta border-neon-magenta/30 bg-neon-magenta/10';
      default: return 'text-white/50 border-white/10';
    }
  };

  const getAvatarColor = (seed: string) => {
    switch (seed) {
      case 'karan': return 'from-amber-500 to-red-600 border-amber-400';
      case 'ramesh': return 'from-purple-500 to-indigo-600 border-purple-400';
      case 'shruti': return 'from-cyan-500 to-blue-600 border-cyan-400';
      case 'babubhai': return 'from-emerald-500 to-teal-600 border-emerald-400';
      default: return 'from-gray-500 to-slate-600 border-gray-400';
    }
  };

  return (
    <PageTransition>
      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8 flex-grow">
        
        {/* Terminal Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan glow-cyan">System: Online</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-mono tracking-tight text-white m-0 flex items-center gap-3">
              <img src="/logo.png" className="w-9 h-9 object-contain" alt="Conversa Logo" />
              Conversa <span className="text-neon-cyan">IMMERSION</span>
            </h1>
            <p className="font-sans text-sm text-white/50 mt-1 max-w-lg">
              Live roleplay conversations with in-character AI personas. Real-time scenarios, zero distraction, deep coach feedback.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/history')}
            className="font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded border border-white/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/5 text-white/70 hover:text-neon-cyan transition-all duration-200 flex items-center gap-2 self-stretch md:self-auto justify-center cyber-button-clip"
          >
            <History className="w-4 h-4" />
            Session Logs
          </button>
        </header>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Scenarios Grid (Left 2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="font-mono text-sm uppercase tracking-wider text-white/40 mb-1 flex items-center gap-2">
              <Activity className="w-4 h-4 text-neon-cyan" />
              Select Immersion Arena
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  onClick={() => handleCardClick(scenario)}
                  className={`cursor-pointer rounded-lg border p-5 transition-all duration-300 flex flex-col gap-4 group relative ${
                    selectedScenario?.id === scenario.id
                      ? 'bg-neon-cyan/5 border-neon-cyan/50 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                      : 'bg-cyber-panel/60 border-white/5 hover:border-white/15 hover:bg-cyber-panel/80'
                  }`}
                >
                  {/* Status Indicator */}
                  {selectedScenario?.id === scenario.id && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-neon-cyan rounded-bl-lg rounded-tr-md shadow-[0_0_5px_rgba(0,240,255,0.8)]" />
                  )}

                  {/* Header info */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded bg-gradient-to-tr ${getAvatarColor(scenario.persona.avatarSeed)} flex items-center justify-center font-mono font-bold text-white border border-white/10 shrink-0`}>
                        {scenario.persona.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-sans text-base font-bold text-white group-hover:text-neon-cyan transition-colors leading-tight">
                          {scenario.name}
                        </h3>
                        <span className="font-mono text-[10px] text-white/40">{scenario.persona.name} ({scenario.persona.role})</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs text-white/60 leading-relaxed min-h-8">
                    {scenario.description}
                  </p>

                  {/* Meta Tags Footer */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto font-mono text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-white/30" />
                      <span className="text-white/50">{scenario.targetLanguage.join(' / ')}</span>
                    </div>

                    <div className={`px-2 py-0.5 rounded border ${getDifficultyColor(scenario.difficulty)}`}>
                      {scenario.difficulty}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Config & Enter Panel (Right Column) */}
          <div className="lg:col-span-1 bg-cyber-panel border border-white/5 rounded-lg p-6 flex flex-col gap-6 relative overflow-hidden">
            
            {/* Hologram lines background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

            <h2 className="font-mono text-sm uppercase tracking-wider text-white/40 border-b border-white/5 pb-3 m-0">
              Immersion Parameters
            </h2>

            {selectedScenario ? (
              <div className="flex flex-col gap-6">
                
                {/* Selected Scenario Preview */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase text-neon-cyan">Target Persona</span>
                  <div className="bg-black/35 rounded-lg border border-white/5 p-4 flex flex-col gap-2">
                    <span className="font-sans text-sm font-bold text-white">{selectedScenario.persona.name}</span>
                    <p className="font-sans text-xs text-white/50 leading-relaxed italic">
                      "{selectedScenario.persona.bio}"
                    </p>
                  </div>
                </div>

                {/* Target Language Select */}
                <div className="flex flex-col gap-2.5">
                  <span className="font-mono text-[10px] uppercase text-neon-cyan flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    Target Language
                  </span>
                  <div className="flex gap-2">
                    {selectedScenario.targetLanguage.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang as TargetLanguage)}
                        className={`flex-1 font-mono text-xs uppercase tracking-wider py-2 rounded border transition-all duration-200 ${
                          activeLanguage === lang
                            ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan font-semibold shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                            : 'bg-black/20 border-white/5 text-white/40 hover:text-white/70 hover:border-white/10'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Proficiency */}
                <div className="flex flex-col gap-2.5">
                  <span className="font-mono text-[10px] uppercase text-neon-cyan flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    Your Target Level
                  </span>
                  <div className="flex flex-col gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setActiveProficiency(level)}
                        className={`font-mono text-xs text-left px-4 py-2.5 rounded border transition-all duration-200 flex items-center justify-between ${
                          activeProficiency === level
                            ? 'bg-white/5 border-neon-cyan text-white font-semibold'
                            : 'bg-black/25 border-white/5 text-white/40 hover:text-white/75'
                        }`}
                      >
                        {level}
                        {activeProficiency === level && (
                          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_4px_rgba(0,240,255,0.8)] animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Launch Button */}
                <button
                  onClick={handleLaunch}
                  className="w-full bg-gradient-to-r from-neon-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 border border-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-widest py-3.5 rounded flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.45)] transition-all duration-300 cyber-button-clip"
                >
                  <Play className="w-4 h-4 fill-black" />
                  Initialize Immersion
                </button>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-white/5 rounded-lg bg-black/15">
                <Globe className="w-10 h-10 text-white/10 mb-3 animate-pulse" />
                <p className="font-mono text-xs text-white/30 uppercase tracking-wider">
                  Awaiting Arena Selection
                </p>
                <p className="font-sans text-[11px] text-white/20 mt-1 max-w-[200px]">
                  Click on any scenario card in the grid to configure your immersion session.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </PageTransition>
  );
};
