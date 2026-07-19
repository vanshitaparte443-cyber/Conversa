import React from 'react';
import { useSession } from '../../context/SessionContext';
import { Mic, Square, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
        return <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />;
      default:
        return <Mic className="w-5 h-5 text-white" />;
    }
  };

  const getButtonClass = () => {
    if (recordingState === 'listening') {
      return 'bg-rose-500 hover:bg-rose-600 border-rose-400/30 shadow-[0_0_30px_rgba(244,63,94,0.4)]';
    }
    if (recordingState === 'processing') {
      return 'bg-zinc-900 border-zinc-800 cursor-wait';
    }
    return 'bg-gradient-to-tr from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 border-indigo-400/20 shadow-[0_8px_25px_rgba(99,102,241,0.15)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)]';
  };

  return (
    <div className="flex flex-col items-center gap-3.5">
      {/* Animated Waveform container while listening */}
      <div className="h-10 flex items-center justify-center gap-1 min-w-56">
        {recordingState === 'listening' ? (
          Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 rounded-full"
              initial={{ height: 4 }}
              animate={{
                height: [4, Math.random() * 32 + 6, 4]
              }}
              transition={{
                duration: 0.4 + Math.random() * 0.4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))
        ) : recordingState === 'processing' ? (
          <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase animate-pulse">
            Analyzing speech signals...
          </span>
        ) : (
          <span className="text-xs text-zinc-500 font-medium tracking-wide">
            Click microphone to speak
          </span>
        )}
      </div>

      {/* Main Trigger Button */}
      <div className="relative">
        {/* Pulsing ring around button */}
        {recordingState === 'listening' && (
          <div className="absolute inset-0 rounded-full bg-rose-500/10 animate-ping pointer-events-none scale-125" />
        )}
        {recordingState === 'idle' && (
          <motion.div 
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-indigo-500/[0.04] pointer-events-none scale-110" 
          />
        )}

        <button
          onClick={handlePress}
          disabled={recordingState === 'processing'}
          className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer ${getButtonClass()}`}
        >
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
};
