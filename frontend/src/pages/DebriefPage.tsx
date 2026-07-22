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
    if (score >= 90) return 'text-emerald-800 border-emerald-600 bg-emerald-50';
    if (score >= 75) return 'text-[#F4602A] border-[#F4602A] bg-orange-50';
    return 'text-amber-800 border-amber-600 bg-amber-50';
  };

  return (
    <PageTransition>
      <div className="w-full min-h-screen bg-[#FAFAFA] text-[#18181B] px-4 py-8 flex flex-col gap-8 flex-grow">
        
        {/* Header */}
        <header className="max-w-5xl mx-auto w-full border-b border-[#E4E4E7] pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-xs uppercase tracking-widest text-[#F4602A] font-bold">
              <Award className="w-4 h-4 text-[#F4602A]" />
              Immersion Session Debrief
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#18181B] m-0 flex items-center gap-3">
              <img src="/logo.png" className="w-8 h-8 object-contain" alt="Conversa Logo" />
              Coach <span className="text-[#F4602A] font-extrabold">Report</span>
            </h1>
            <p className="font-sans text-xs text-zinc-500 mt-1">
              Analyzing conversational flows, local idioms, and grammar patterns.
            </p>
          </div>
          
          <button
            onClick={handleBackToScenarios}
            className="font-mono text-xs uppercase tracking-wider px-3.5 py-2 rounded-xl border border-[#E4E4E7] bg-white hover:bg-zinc-50 text-zinc-700 shadow-xs transition-all duration-200 flex items-center gap-1.5 self-stretch md:self-auto justify-center cursor-pointer font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Coach Mode
          </button>
        </header>

        {/* Dashboard statistics panel */}
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          
          {/* Score Circle Gauge */}
          <div className="md:col-span-1 bg-white border border-[#E4E4E7] rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xs">
            <span className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider mb-2 font-semibold">Fluency Score</span>
            
            <div className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center shadow-xs ${getScoreColor(currentDebrief.score)}`}>
              <span className="font-mono text-3xl font-extrabold">{animatedScore}%</span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold -mt-0.5">Accurate</span>
            </div>

            <span className="font-mono text-[9px] text-zinc-400 mt-3 font-semibold">ACCURACY METRIC</span>
          </div>

          {/* Session Overview Details */}
          <div className="md:col-span-3 bg-white border border-[#E4E4E7] rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xs">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-orange-50 border border-orange-200 font-mono text-xs font-semibold text-[#F4602A]">
                  {currentLanguage}
                </span>
                <span className="font-mono text-xs text-zinc-300">•</span>
                <span className="font-sans text-xs text-zinc-500 font-medium">
                  Duration: {Math.floor(currentDebrief.durationSeconds / 60)}m {currentDebrief.durationSeconds % 60}s
                </span>
              </div>
              <p className="font-sans text-sm text-zinc-700 leading-relaxed font-normal">
                {currentDebrief.overallFeedback}
              </p>
            </div>

            <div className="border-t border-[#E4E4E7] pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-500 font-mono">
              <div>
                <span className="text-zinc-400 uppercase text-[9px] block font-semibold">Grammar Errors</span>
                <span className="text-rose-700 text-sm font-bold">{currentDebrief.mistakes.length} Identified</span>
              </div>
              <div className="h-6 w-px bg-[#E4E4E7]" />
              <div>
                <span className="text-zinc-400 uppercase text-[9px] block font-semibold">Vocab Highlights</span>
                <span className="text-[#F4602A] text-sm font-bold">{currentDebrief.vocabulary.length} Items</span>
              </div>
              <div className="h-6 w-px bg-[#E4E4E7]" />
              <div>
                <span className="text-zinc-400 uppercase text-[9px] block font-semibold">Phrasing alternatives</span>
                <span className="text-amber-700 text-sm font-bold">{currentDebrief.phrasingComparison.length} Tips</span>
              </div>
            </div>
          </div>

        </div>

        {/* Coach Tabs Section */}
        <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col gap-0">
          
          {/* Tabs Selector Bar */}
          <div className="flex border border-[#E4E4E7] border-b-0 p-1 gap-1 bg-[#F4F4F5] rounded-t-2xl">
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`flex-1 md:flex-initial px-6 py-3 font-mono text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'mistakes'
                  ? 'bg-[#F4602A] text-white font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-[#18181B]'
              }`}
            >
              <AlertCircle className="w-4 h-4 text-white" />
              Key Mistakes
            </button>
            <button
              onClick={() => setActiveTab('phrasing')}
              className={`flex-1 md:flex-initial px-6 py-3 font-mono text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'phrasing'
                  ? 'bg-[#F4602A] text-white font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-[#18181B]'
              }`}
            >
              <Compass className="w-4 h-4 text-white" />
              Natural Phrasing
            </button>
            <button
              onClick={() => setActiveTab('vocab')}
              className={`flex-1 md:flex-initial px-6 py-3 font-mono text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'vocab'
                  ? 'bg-[#F4602A] text-white font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-[#18181B]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-white" />
              Vocabulary Recap
            </button>
          </div>

          {/* Active Tab Screen */}
          <div className="bg-white border border-[#E4E4E7] p-6 rounded-b-2xl min-h-[300px] shadow-xs">
            {activeTab === 'mistakes' && <KeyMistakes mistakes={currentDebrief.mistakes} />}
            {activeTab === 'phrasing' && <PhrasingComparison phrasing={currentDebrief.phrasingComparison} />}
            {activeTab === 'vocab' && <VocabRecap vocabulary={currentDebrief.vocabulary} />}
          </div>

        </div>

        {/* Footer Navigation Buttons */}
        <footer className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#E4E4E7] pt-6 mt-auto">
          
          <button
            onClick={handleReplay}
            className="font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl border border-[#E4E4E7] bg-white hover:bg-zinc-50 text-zinc-700 font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-4 h-4 text-[#F4602A]" />
            Replay This Scenario
          </button>

          {currentScenario?.difficulty !== 'Hard' ? (
            <button
              onClick={handleTryHarder}
              className="font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl bg-[#F4602A] hover:bg-[#d95222] text-white font-bold shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Try Harder Difficulty ({currentScenario?.difficulty === 'Easy' ? 'Medium' : 'Hard'})
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          ) : (
            <div className="bg-orange-50 border border-orange-200 text-[#F4602A] rounded-xl py-3.5 px-4 font-mono text-xs text-center flex items-center justify-center uppercase tracking-wider font-semibold">
              Maximum Difficulty Cleared
            </div>
          )}

          <button
            onClick={handleBackToScenarios}
            className="font-mono text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl border border-[#E4E4E7] bg-white hover:bg-zinc-50 text-zinc-700 font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            Back to Scenarios
          </button>

        </footer>

      </div>
    </PageTransition>
  );
};
