import React from 'react';
import { useSession } from '../../context/SessionContext';
import { Mic, Square, Loader2, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MicButton: React.FC = () => {
  const { recordingState, startRecording, stopRecording } = useSession();

  const handlePress = () => {
    if (recordingState === 'idle') {
      startRecording();
    } else if (recordingState === 'listening') {
      stopRecording();
    }
  };

  const getButtonContent = () => {
    switch (recordingState) {
      case 'listening':
        return <Square className="w-5 h-5 text-white fill-white" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />;
      default:
        return <Mic className="w-6 h-6 text-white" />;
    }
  };

  const getButtonClass = () => {
    if (recordingState === 'listening') {
      return 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-xl shadow-red-500/30';
    }
    if (recordingState === 'processing') {
      return 'bg-white border-2 border-amber-300 text-amber-600 cursor-wait shadow-lg';
    }
    return 'bg-gradient-to-tr from-[#A8562E] via-[#F4602A] to-[#E8A33D] text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40';
  };

  return (
    <div className="flex flex-col items-center gap-3 relative py-1">
      {/* Animated Soundwave Visualizer while listening */}
      <div className="h-10 flex items-center justify-center gap-1 min-w-64">
        {recordingState === 'listening' ? (
          <div className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md">
            <Volume2 className="w-3.5 h-3.5 text-red-500 animate-pulse mr-1" />
            {Array.from({ length: 22 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-red-500 to-rose-400 rounded-full"
                initial={{ height: 4 }}
                animate={{
                  height: [6, Math.floor(Math.sin(i * 0.5 + Date.now()) * 14 + 18), 6]
                }}
                transition={{
                  duration: 0.35 + (i % 5) * 0.08,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        ) : recordingState === 'processing' ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="font-mono text-xs text-amber-700 tracking-wider uppercase font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Processing audio stream...
            </span>
          </div>
        ) : (
          <span className="font-mono text-xs text-slate-500 font-medium flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Tap mic to start speaking
          </span>
        )}
      </div>

      {/* Mic Button Wrapper with Outer Aura Waves */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing Ripple Rings on Listening */}
        <AnimatePresence>
          {recordingState === 'listening' && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-red-500/30 pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 2.3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-rose-400/20 pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>

        {/* Ambient Glow Aura */}
        <div className={`absolute -inset-1 rounded-full blur-md opacity-70 transition-all duration-300 ${
          recordingState === 'listening' 
            ? 'bg-gradient-to-r from-red-500 to-rose-500 opacity-90 blur-lg animate-pulse' 
            : 'bg-gradient-to-r from-orange-500 to-amber-500 opacity-40 hover:opacity-75'
        }`} />

        {/* Main Mic Push-to-Talk Trigger */}
        <motion.button
          onClick={handlePress}
          disabled={recordingState === 'processing'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${getButtonClass()}`}
        >
          {getButtonContent()}
        </motion.button>
      </div>
    </div>
  );
};

