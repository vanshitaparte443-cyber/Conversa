import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { PageTransition } from '../components/layout/PageTransition';
import { mockScenarios } from '../data/mockScenarios';
import { ArrowLeft, Trash2, Calendar, FileText, ChevronRight, Activity } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { history, loadHistoricalDebrief, clearHistory } = useSession();

  const handleRowClick = (debrief: any) => {
    loadHistoricalDebrief(debrief);
    navigate('/debrief');
  };

  const getScenarioName = (id: string) => {
    return mockScenarios.find(s => s.id === id)?.name || id;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-neon-green';
    if (score >= 75) return 'text-neon-cyan';
    return 'text-neon-amber';
  };

  return (
    <PageTransition>
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8 flex-grow">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-xs uppercase tracking-widest text-neon-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
              Conversation Archives
            </div>
            <h1 className="text-3xl font-bold font-mono tracking-tight text-white m-0 flex items-center gap-3">
              <img src="/logo.png" className="w-8 h-8 object-contain" alt="Conversa Logo" />
              Session <span className="text-neon-cyan">History</span>
            </h1>
            <p className="font-sans text-xs text-white/50 mt-1">
              Browse your past immersion attempts, fluency logs, and critique metrics.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/select')}
            className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5 rounded border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-200 flex items-center gap-1.5 cyber-button-clip"
          >
            <ArrowLeft className="w-4 h-4" />
            Selection
          </button>
        </header>

        {/* History Area */}
        <div className="flex flex-col gap-4">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-2 font-mono text-[10px] uppercase text-white/40">
            <span>Past Sessions ({history.length})</span>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Logs
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <div className="flex flex-col gap-3">
              {history.map((debrief) => (
                <div
                  key={debrief.id}
                  onClick={() => handleRowClick(debrief)}
                  className="bg-cyber-panel/60 border border-white/5 hover:border-neon-cyan/40 hover:bg-cyber-panel hover:shadow-[0_0_12px_rgba(0,240,255,0.05)] rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer transition-all duration-200 group"
                >
                  
                  {/* Scenario Info */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-neon-cyan group-hover:border-neon-cyan/35 transition-colors shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-bold text-white group-hover:text-neon-cyan transition-colors leading-snug">
                        {getScenarioName(debrief.scenarioId)}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-white/40 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {debrief.date}
                        </span>
                        <span>•</span>
                        <span>{debrief.language}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Score */}
                  <div className="flex items-center gap-6 justify-between w-full md:w-auto border-t border-white/5 md:border-0 pt-3 md:pt-0">
                    
                    <div className="hidden lg:block text-right max-w-xs">
                      <p className="font-sans text-xs text-white/50 line-clamp-1 italic">
                        "{debrief.overallFeedback}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                      <div className="text-right font-mono">
                        <span className="text-[9px] uppercase tracking-wider text-white/30 block leading-none">Fluency</span>
                        <span className={`text-base font-extrabold ${getScoreColor(debrief.score)}`}>
                          {debrief.score}%
                        </span>
                      </div>

                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-neon-cyan group-hover:translate-x-0.5 transition-all" />
                    </div>

                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/5 rounded-lg bg-black/10">
              <Activity className="w-8 h-8 text-white/10 mb-2 animate-pulse" />
              <p className="font-mono text-xs text-white/30 uppercase tracking-wider">
                No Archive Found
              </p>
              <p className="font-sans text-xs text-white/20 mt-1 max-w-xs">
                You haven't completed any immersion scenarios yet. Launch an arena from selection and complete it to generate records.
              </p>
            </div>
          )}

        </div>

      </div>
    </PageTransition>
  );
};
