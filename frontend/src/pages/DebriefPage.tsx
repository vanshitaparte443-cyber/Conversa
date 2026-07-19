import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { PageTransition } from '../components/layout/PageTransition';
import { KeyMistakes } from '../components/debrief/KeyMistakes';
import { PhrasingComparison } from '../components/debrief/PhrasingComparison';
import { VocabRecap } from '../components/debrief/VocabRecap';
import { Award, ArrowLeft, RefreshCw, ChevronRight, BookOpen, AlertCircle, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const DebriefPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentDebrief, currentScenario, currentLanguage, selectScenario, resetSession } = useSession();
  
  const [activeTab, setActiveTab] = useState<'mistakes' | 'phrasing' | 'vocab'>('mistakes');
  const [animatedScore, setAnimatedScore] = useState(0);

  // Redirect if no active debrief is loaded
  useEffect(() => {
    if (!currentDebrief) {
      navigate('/select');
    }
  }, [currentDebrief, navigate]);

  // Fluency score count-up effect
  useEffect(() => {
    if (!currentDebrief) return;
    let start = 0;
    const end = currentDebrief.score;
    if (start === end) {
      setAnimatedScore(end);
      return;
    }
    const duration = 1200; // 1.2s total duration
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 15));
    
    return () => clearInterval(timer);
  }, [currentDebrief]);

  if (!currentDebrief) return null;

  const handleReplay = () => {
    if (!currentScenario) return;
    selectScenario(currentScenario, currentLanguage, 'Intermediate');
    navigate('/chat');
  };

  const handleTryHarder = () => {
    if (!currentScenario) return;
    
    const nextDiff = currentScenario.difficulty === 'Easy' ? 'Medium' : 'Hard';
    const upgradedScenario = {
      ...currentScenario,
      difficulty: nextDiff as any
    };

    selectScenario(upgradedScenario, currentLanguage, 'Advanced');
    navigate('/chat');
  };

  const handleBackToScenarios = () => {
    resetSession();
    navigate('/select');
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]';
    if (score >= 75) return 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.1)]';
    return 'text-amber-400 border-amber-500/20 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.1)]';
  };

  return (
    <PageTransition>
      <div className="w-full min-h-screen bg-cyber-bg text-zinc-100 px-4 py-8 md:py-12 flex flex-col justify-center gap-8 flex-grow">
        
        {/* Sleek Header */}
        <header className="max-w-5xl mx-auto w-full border-b border-white/10 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-indigo-400 font-bold">
              <Award className="w-4 h-4 text-indigo-400" />
              Immersion Session Debrief
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white m-0 flex items-center gap-3">
              <img src="/logo.png" className="w-8 h-8 object-contain" alt="Conversa Logo" />
              Coach <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-normal">Report</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Analyzing conversational flows, local idioms, and grammar patterns.
            </p>
          </div>
          
          <button
            onClick={handleBackToScenarios}
            className="text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xl border border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/5 text-zinc-300 hover:text-indigo-400 transition-all duration-300 flex items-center gap-1.5 self-stretch md:self-auto justify-center cursor-pointer shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Coach Mode
          </button>
        </header>

        {/* Dashboard statistics panel */}
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          
          {/* Score Circle Gauge */}
          <div className="md:col-span-1 glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg border border-white/5">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-3">Fluency Score</span>
            
            <div className={`w-28 h-28 rounded-full border flex flex-col items-center justify-center bg-zinc-950/50 ${getScoreColor(currentDebrief.score)}`}>
              <span className="text-3xl font-extrabold font-mono tracking-tighter">{animatedScore}%</span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold -mt-0.5">Accurate</span>
            </div>

            <span className="text-[9px] text-zinc-600 font-semibold tracking-wider uppercase mt-4">Automated Metric</span>
          </div>

          {/* Session Overview Details */}
          <div className="md:col-span-3 glass-panel rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-5 shadow-lg border border-white/5">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400">
                  {currentLanguage}
                </span>
                <span className="text-zinc-600 font-bold text-xs">•</span>
                <span className="text-xs text-zinc-400 font-medium">
                  Duration: {Math.floor(currentDebrief.durationSeconds / 60)}m {currentDebrief.durationSeconds % 60}s
                </span>
              </div>
              <p className="text-[14px] text-zinc-300 leading-relaxed font-medium">
                {currentDebrief.overallFeedback}
              </p>
            </div>

            <div className="border-t border-white/5 pt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
              <div>
                <span className="text-zinc-500 block mb-0.5">Grammar Mistakes</span>
                <span className="text-rose-400 text-sm font-bold">{currentDebrief.mistakes.length} Identified</span>
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="text-zinc-500 block mb-0.5">Vocabulary Recap</span>
                <span className="text-indigo-400 text-sm font-bold">{currentDebrief.vocabulary.length} Highlighted</span>
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="text-zinc-500 block mb-0.5">Phrasing Tips</span>
                <span className="text-amber-400 text-sm font-bold">{currentDebrief.phrasingComparison.length} Suggested</span>
              </div>
            </div>
          </div>

        </div>

        {/* Coach Tabs Section */}
        <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col gap-5">
          
          {/* Tabs Selector Bar using Framer Motion LayoutId */}
          <div className="flex border border-white/5 p-1.5 gap-2 bg-zinc-950/30 rounded-2xl relative w-full md:w-max shadow-inner">
            {(['mistakes', 'phrasing', 'vocab'] as const).map((tab) => {
              const isActive = activeTab === tab;
              const tabLabels = {
                mistakes: { label: 'Key Mistakes', icon: AlertCircle },
                phrasing: { label: 'Natural Phrasing', icon: Compass },
                vocab: { label: 'Vocabulary Recap', icon: BookOpen },
              };
              const Icon = tabLabels[tab].icon;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-3 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer select-none flex-1 md:flex-none ${
                    isActive ? 'text-indigo-400' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  style={{ zIndex: 1 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDebriefTab"
                      className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="relative z-10">{tabLabels[tab].label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Screen */}
          <div className="glass-panel-light border border-white/5 p-6 md:p-8 rounded-2xl min-h-[300px] shadow-sm">
            {activeTab === 'mistakes' && <KeyMistakes mistakes={currentDebrief.mistakes} />}
            {activeTab === 'phrasing' && <PhrasingComparison phrasing={currentDebrief.phrasingComparison} />}
            {activeTab === 'vocab' && <VocabRecap vocabulary={currentDebrief.vocabulary} />}
          </div>

        </div>

        {/* Footer Navigation Buttons */}
        <footer className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-6 mt-auto">
          
          <button
            onClick={handleReplay}
            className="text-xs font-semibold uppercase tracking-wider py-4 px-4 rounded-xl border border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/5 text-zinc-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
          >
            <RefreshCw className="w-4 h-4 text-indigo-400" />
            Replay This Scenario
          </button>

          {currentScenario?.difficulty !== 'Hard' ? (
            <button
              onClick={handleTryHarder}
              className="text-xs font-semibold uppercase tracking-wider py-4 px-4 rounded-xl border border-indigo-500/20 hover:border-indigo-400/20 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-indigo-500/15 active:scale-[0.98]"
            >
              Try Harder Difficulty ({currentScenario?.difficulty === 'Easy' ? 'Medium' : 'Hard'})
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="bg-white/[0.02] border border-white/5 text-zinc-600 rounded-xl py-4 px-4 text-xs font-semibold text-center flex items-center justify-center uppercase tracking-wider select-none">
              Maximum Difficulty Cleared
            </div>
          )}

          <button
            onClick={handleBackToScenarios}
            className="text-xs font-semibold uppercase tracking-wider py-4 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
          >
            Back to Scenarios
          </button>

        </footer>

      </div>
    </PageTransition>
  );
};
