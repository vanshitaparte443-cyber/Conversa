import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { PageTransition } from '../components/layout/PageTransition';
import { KeyMistakes } from '../components/debrief/KeyMistakes';
import { PhrasingComparison } from '../components/debrief/PhrasingComparison';
import { VocabRecap } from '../components/debrief/VocabRecap';
import { Award, ArrowLeft, RefreshCw, ChevronRight, BookOpen, AlertCircle, Compass } from 'lucide-react';

export const DebriefPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentDebrief, currentScenario, currentLanguage, selectScenario, resetSession } = useSession();
  
  const [activeTab, setActiveTab] = useState<'mistakes' | 'phrasing' | 'vocab'>('mistakes');

  // Redirect if no active debrief is loaded
  useEffect(() => {
    if (!currentDebrief) {
      navigate('/select');
    }
  }, [currentDebrief, navigate]);

  if (!currentDebrief) return null;

  const handleReplay = () => {
    if (!currentScenario) return;
    selectScenario(currentScenario, currentLanguage, 'Intermediate');
    navigate('/chat');
  };

  const handleTryHarder = () => {
    if (!currentScenario) return;
    
    // Find a harder scenario or just launch current with 'Hard' setting
    const nextDiff = currentScenario.difficulty === 'Easy' ? 'Medium' : 'Hard';
    
    // Modify selected scenario to next difficulty
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
    if (score >= 90) return 'text-neon-green border-neon-green/30';
    if (score >= 75) return 'text-neon-cyan border-neon-cyan/30';
    return 'text-neon-amber border-neon-amber/30';
  };

  return (
    <PageTransition>
      {/* Visual background shift to deep dark violet/indigo to distinguish Coach mode */}
      <div className="w-full min-h-screen bg-gradient-to-b from-[#0c0818] via-[#100b24] to-[#070510] text-white/90 px-4 py-8 flex flex-col gap-8 flex-grow">
        
        {/* Header */}
        <header className="max-w-5xl mx-auto w-full border-b border-purple-500/10 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-xs uppercase tracking-widest text-neon-magenta glow-magenta">
              <Award className="w-4 h-4 text-neon-magenta" />
              Immersion Session Debrief
            </div>
            <h1 className="text-3xl font-bold font-mono tracking-tight text-white m-0 flex items-center gap-3">
              <img src="/logo.png" className="w-8 h-8 object-contain" alt="Conversa Logo" />
              Coach <span className="text-neon-magenta">Report</span>
            </h1>
            <p className="font-sans text-xs text-white/50 mt-1">
              Analyzing conversational flows, local idioms, and grammar patterns.
            </p>
          </div>
          
          <button
            onClick={handleBackToScenarios}
            className="font-mono text-xs uppercase tracking-wider px-3.5 py-2 rounded border border-white/10 hover:border-neon-magenta/50 hover:bg-neon-magenta/5 text-white/70 hover:text-neon-magenta transition-all duration-200 flex items-center gap-1.5 self-stretch md:self-auto justify-center cyber-button-clip"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Coach Mode
          </button>
        </header>

        {/* Dashboard statistics panel */}
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          
          {/* Score Circle Gauge */}
          <div className="md:col-span-1 bg-[#150f2b]/80 border border-purple-500/10 rounded-lg p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg">
            <span className="font-mono text-[10px] uppercase text-white/40 tracking-wider mb-2">Fluency Score</span>
            
            <div className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center bg-black/30 shadow-[0_0_15px_rgba(157,23,248,0.1)] ${getScoreColor(currentDebrief.score)}`}>
              <span className="font-mono text-3xl font-extrabold">{currentDebrief.score}%</span>
              <span className="text-[9px] uppercase tracking-widest text-white/40 -mt-0.5">Accurate</span>
            </div>

            <span className="font-mono text-[9px] text-white/30 mt-3">MOCK METRIC</span>
          </div>

          {/* Session Overview Details */}
          <div className="md:col-span-3 bg-[#150f2b]/80 border border-purple-500/10 rounded-lg p-6 flex flex-col justify-between gap-4 shadow-lg">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-white/60">
                  {currentLanguage}
                </span>
                <span className="font-mono text-xs text-white/40">•</span>
                <span className="font-sans text-xs text-white/50">
                  Duration: {Math.floor(currentDebrief.durationSeconds / 60)}m {currentDebrief.durationSeconds % 60}s
                </span>
              </div>
              <p className="font-sans text-sm text-white/80 leading-relaxed">
                {currentDebrief.overallFeedback}
              </p>
            </div>

            <div className="border-t border-purple-500/10 pt-4 flex flex-wrap items-center gap-6 text-xs text-white/50 font-mono">
              <div>
                <span className="text-white/30 uppercase text-[9px] block">Grammar Errors</span>
                <span className="text-neon-magenta text-sm font-bold">{currentDebrief.mistakes.length} Identified</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <span className="text-white/30 uppercase text-[9px] block">Vocab Highlights</span>
                <span className="text-neon-cyan text-sm font-bold">{currentDebrief.vocabulary.length} Items</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <span className="text-white/30 uppercase text-[9px] block">Phrasing alternatives</span>
                <span className="text-neon-amber text-sm font-bold">{currentDebrief.phrasingComparison.length} Tips</span>
              </div>
            </div>
          </div>

        </div>

        {/* Coach Tabs Section */}
        <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col gap-4">
          
          {/* Tabs Selector Bar */}
          <div className="flex border-b border-purple-500/10 p-0.5 gap-1 bg-[#150f2b]/40 rounded-t-lg">
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`flex-1 md:flex-initial px-6 py-3 font-mono text-xs uppercase tracking-wider rounded-t-md flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'mistakes'
                  ? 'border-neon-magenta text-neon-magenta bg-[#1b1436]'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              Key Mistakes
            </button>
            <button
              onClick={() => setActiveTab('phrasing')}
              className={`flex-1 md:flex-initial px-6 py-3 font-mono text-xs uppercase tracking-wider rounded-t-md flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'phrasing'
                  ? 'border-neon-cyan text-neon-cyan bg-[#1b1436]'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <Compass className="w-4 h-4" />
              Natural Phrasing
            </button>
            <button
              onClick={() => setActiveTab('vocab')}
              className={`flex-1 md:flex-initial px-6 py-3 font-mono text-xs uppercase tracking-wider rounded-t-md flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'vocab'
                  ? 'border-neon-amber text-neon-amber bg-[#1b1436]'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Vocabulary Recap
            </button>
          </div>

          {/* Active Tab Screen */}
          <div className="bg-[#150f2b]/30 border border-purple-500/5 p-6 rounded-b-lg min-h-[300px]">
            {activeTab === 'mistakes' && <KeyMistakes mistakes={currentDebrief.mistakes} />}
            {activeTab === 'phrasing' && <PhrasingComparison phrasing={currentDebrief.phrasingComparison} />}
            {activeTab === 'vocab' && <VocabRecap vocabulary={currentDebrief.vocabulary} />}
          </div>

        </div>

        {/* Footer Navigation Buttons */}
        <footer className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-purple-500/10 pt-6 mt-auto">
          
          <button
            onClick={handleReplay}
            className="font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded border border-purple-500/30 hover:border-purple-400 bg-purple-950/20 hover:bg-purple-900/30 text-white/80 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer cyber-button-clip"
          >
            <RefreshCw className="w-4 h-4 text-purple-400" />
            Replay This Scenario
          </button>

          {currentScenario?.difficulty !== 'Hard' ? (
            <button
              onClick={handleTryHarder}
              className="font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded border border-neon-magenta/30 hover:border-neon-magenta bg-neon-magenta/5 hover:bg-neon-magenta/15 text-neon-magenta hover:text-white hover:shadow-[0_0_15px_rgba(255,0,127,0.25)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer cyber-button-clip"
            >
              Try Harder Difficulty ({currentScenario?.difficulty === 'Easy' ? 'Medium' : 'Hard'})
              <ChevronRight className="w-4 h-4 text-neon-magenta" />
            </button>
          ) : (
            <div className="bg-white/5 border border-white/5 text-white/30 rounded py-3.5 px-4 font-mono text-xs text-center flex items-center justify-center uppercase tracking-wider">
              Maximum Difficulty Cleared
            </div>
          )}

          <button
            onClick={handleBackToScenarios}
            className="font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer cyber-button-clip"
          >
            Back to Scenarios
          </button>

        </footer>

      </div>
    </PageTransition>
  );
};
