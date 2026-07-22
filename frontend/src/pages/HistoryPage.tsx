import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { PageTransition } from '../components/layout/PageTransition';
import { mockScenarios } from '../data/mockScenarios';
import { ArrowLeft, Trash2, Calendar, FileText, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

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
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

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
    if (score >= 90) return 'text-emerald-800';
    if (score >= 75) return 'text-[#F4602A]';
    return 'text-amber-800';
  };

  return (
    <PageTransition>
      <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8 flex-grow bg-[#FAFAFA] min-h-screen text-[#18181B]">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#E4E4E7] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-xs uppercase tracking-widest text-[#F4602A] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F4602A] animate-pulse" />
              Conversation Archives
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#18181B] m-0 flex items-center gap-3">
              <img src="/logo.png" className="w-8 h-8 object-contain" alt="Conversa Logo" />
              Session <span className="text-[#F4602A] font-extrabold">History</span>
            </h1>
            <p className="font-sans text-xs text-zinc-500 mt-1">
              Browse your past immersion attempts, fluency logs, and critique metrics.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/select')}
            className="font-mono text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] bg-white hover:bg-zinc-50 text-zinc-700 shadow-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-[#F4602A]" />
            Selection
          </button>
        </header>

        {/* History Area */}
        <div className="flex flex-col gap-4">
          
          <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-2 font-mono text-[10px] uppercase text-zinc-500 font-semibold">
            <span>Past Sessions ({history.length})</span>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-rose-700 hover:text-rose-800 flex items-center gap-1 hover:underline cursor-pointer font-semibold"
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
                  className="bg-white border border-[#E4E4E7] hover:border-orange-300 hover:shadow-xs rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer transition-all duration-200 group"
                >
                  
                  {/* Scenario Info */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F4602A] shrink-0 shadow-xs">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-extrabold text-[#18181B] group-hover:text-[#F4602A] transition-colors leading-snug">
                        {getScenarioName(debrief.scenarioId)}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#F4602A]" />
                          {debrief.date}
                        </span>
                        <span>•</span>
                        <span className="text-indigo-400/80">{debrief.language}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Score */}
                  <div className="flex items-center gap-6 justify-between w-full md:w-auto border-t border-[#E4E4E7] md:border-0 pt-3 md:pt-0">
                    
                    <div className="hidden lg:block text-right max-w-xs">
                      <p className="font-sans text-xs text-zinc-500 line-clamp-1 italic">
                        "{debrief.overallFeedback}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                      <div className="text-right font-mono">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-400 block leading-none font-semibold">Fluency</span>
                        <span className={`text-base font-extrabold ${getScoreColor(debrief.score)}`}>
                          {debrief.score}%
                        </span>
                      </div>

                      <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#F4602A] group-hover:translate-x-0.5 transition-all" />
                    </div>

                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-300 rounded-2xl bg-white shadow-xs">
              <Activity className="w-8 h-8 text-[#F4602A] mb-2 animate-pulse" />
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                No Archive Found
              </p>
              <p className="font-sans text-xs text-zinc-400 mt-1 max-w-xs">
                You haven't completed any immersion scenarios yet. Launch an arena from selection and complete it to generate records.
              </p>
            </div>
          )}

        </div>

      </div>
    </PageTransition>
  );
};
