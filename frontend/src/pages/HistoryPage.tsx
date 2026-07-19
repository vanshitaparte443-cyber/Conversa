import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { PageTransition } from '../components/layout/PageTransition';
import { mockScenarios } from '../data/mockScenarios';
import { ArrowLeft, Trash2, Calendar, FileText, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

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
    if (score >= 90) return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
    if (score >= 75) return 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10';
    return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
  };

  // Stagger entry animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100 }
    }
  };

  return (
    <PageTransition>
      <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col justify-center gap-8 flex-grow">
        
        {/* Sleek Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-indigo-400 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse-ring" />
              Conversation Archives
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white m-0 flex items-center gap-3">
              <img src="/logo.png" className="w-8 h-8 object-contain" alt="Conversa Logo" />
              Session <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-normal">History</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Browse your past immersion attempts, fluency logs, and critique metrics.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/select')}
            className="text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Select
          </button>
        </header>

        {/* History Area */}
        <div className="flex flex-col gap-4">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            <span>Past Sessions ({history.length})</span>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 hover:underline cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Logs
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-3.5"
            >
              {history.map((debrief) => (
                <motion.div
                  key={debrief.id}
                  variants={itemVariants}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  onClick={() => handleRowClick(debrief)}
                  className="bg-zinc-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-zinc-900/70 hover:shadow-lg hover:shadow-indigo-500/[0.01] rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer transition-all duration-300 group"
                >
                  
                  {/* Scenario Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors shrink-0 shadow-inner">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                        {getScenarioName(debrief.scenarioId)}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                          {debrief.date}
                        </span>
                        <span>•</span>
                        <span className="text-indigo-400/80">{debrief.language}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Score */}
                  <div className="flex items-center gap-6 justify-between w-full md:w-auto border-t border-white/5 md:border-0 pt-3.5 md:pt-0">
                    
                    <div className="hidden lg:block text-right max-w-xs">
                      <p className="text-xs text-zinc-400 line-clamp-1 italic leading-relaxed">
                        "{debrief.overallFeedback}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                      <div className="text-right">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 block leading-none mb-1">Fluency</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getScoreColor(debrief.score)}`}>
                          {debrief.score}%
                        </span>
                      </div>

                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>

                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-950/20">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 mb-4 shadow-sm">
                <Activity className="w-5 h-5 text-zinc-500" />
              </div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                No Archive Found
              </p>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs leading-relaxed">
                You haven't completed any immersion scenarios yet. Launch an arena from selection and complete it to generate records.
              </p>
            </div>
          )}

        </div>

      </div>
    </PageTransition>
  );
};
