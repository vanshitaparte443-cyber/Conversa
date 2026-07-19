import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { PageTransition } from '../components/layout/PageTransition';
import { ContextBanner } from '../components/layout/ContextBanner';
import { ChatThread } from '../components/chat/ChatThread';
import { MicButton } from '../components/chat/MicButton';
import { TranscriptionPreview } from '../components/chat/TranscriptionPreview';
import { LogOut, CheckSquare } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentScenario, startSession, endConversation, resetSession } = useSession();

  // If page is loaded directly without selecting a scenario, fallback to selection
  useEffect(() => {
    if (!currentScenario) {
      navigate('/select');
    } else {
      startSession();
    }
  }, [currentScenario, navigate]);

  if (!currentScenario) return null;

  const handleAbort = () => {
    if (confirm("Are you sure you want to abort the current immersion session? Your progress won't be saved.")) {
      resetSession();
      navigate('/select');
    }
  };

  const handleComplete = () => {
    endConversation();
    navigate('/debrief');
  };

  return (
    <PageTransition>
      <div className="w-full flex-grow flex flex-col h-screen max-h-screen overflow-hidden bg-cyber-bg relative">
        
        {/* Persistent Immersion Context Banner */}
        <ContextBanner />

        {/* Chat Threads Area */}
        <ChatThread />

        {/* Sleek Glassmorphic Recording Controls Footer */}
        <footer className="w-full bg-zinc-950/65 backdrop-blur-xl border-t border-white/5 p-5 md:p-6 flex flex-col gap-4 z-25 shadow-[0_-8px_30px_rgba(0,0,0,0.3)]">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
            
            {/* Live speech transcription monitor */}
            <TranscriptionPreview />

            {/* Actions Bar */}
            <div className="flex items-center justify-between gap-4">
              
              {/* Left Action: Abort */}
              <button
                onClick={handleAbort}
                className="text-[11px] uppercase tracking-wider px-3.5 sm:px-4 py-2.5 rounded-xl border border-rose-500/20 hover:border-rose-500/40 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-sm active:scale-95 font-semibold"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Abort Session</span>
              </button>

              {/* Center Action: Animated Speech Mic Button */}
              <MicButton />

              {/* Right Action: Complete & Debrief */}
              <button
                onClick={handleComplete}
                className="text-[11px] uppercase tracking-wider px-4 sm:px-4.5 py-2.5 rounded-xl border border-indigo-500/20 hover:border-indigo-400/20 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-md hover:shadow-indigo-500/15 active:scale-[0.98] font-semibold"
              >
                <CheckSquare className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Finish & Debrief</span>
              </button>

            </div>

          </div>
        </footer>

      </div>
    </PageTransition>
  );
};
