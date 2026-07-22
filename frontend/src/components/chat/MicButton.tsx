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
        return <Square className="w-6 h-6 text-white fill-white" />;
      case 'processing':
        return <Loader2 className="w-6 h-6 text-[#F4602A] animate-spin" />;
      default:
        return <Mic className="w-6 h-6 text-white" />;
    }
  };

  const getButtonClass = () => {
    if (recordingState === 'listening') {
      return 'bg-red-500 hover:bg-red-600 border-red-400 shadow-sm';
    }
    if (recordingState === 'processing') {
      return 'bg-white border-orange-200 text-[#F4602A] cursor-wait shadow-xs';
    }
    return 'bg-[#F4602A] hover:bg-[#d95222] border-[#F4602A] shadow-sm';
  };

  return (
    <div className="flex flex-col items-center gap-3.5">
      {/* Animated Waveform container while listening */}
      <div className="h-10 flex items-center justify-center gap-1 min-w-56">
        {recordingState === 'listening' ? (
          Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#F4602A] rounded-full"
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
          <span className="font-mono text-xs text-[#F4602A] tracking-widest uppercase animate-pulse font-semibold">
            Processing voice print...
          </span>
        ) : (
          <span className="font-mono text-xs text-zinc-400 font-medium">
            Tap mic to speak
          </span>
        )}
      </div>

      {/* Main Mic Push-to-Talk Trigger */}
      <button
        onClick={handlePress}
        disabled={recordingState === 'processing'}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95 ${getButtonClass()}`}
      >
        {getButtonContent()}
      </button>
    </div>
  );
};
