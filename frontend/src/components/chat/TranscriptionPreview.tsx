import React from 'react';
import { useSession } from '../../context/SessionContext';
import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const TranscriptionPreview: React.FC = () => {
  const { transcription, recordingState } = useSession();

  if (recordingState === 'idle') return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-zinc-900/50 border border-white/5 rounded-xl p-3.5 relative overflow-hidden shadow-inner"
    >
      <div className="flex items-center justify-between mb-2 border-b border-white/5 pb-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Speech Input Monitor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${recordingState === 'listening' ? 'bg-rose-500 animate-pulse-ring' : 'bg-indigo-500 animate-pulse'}`} />
          <span className="text-zinc-500 font-bold uppercase">
            {recordingState === 'listening' ? 'Streaming' : 'Processing...'}
          </span>
        </div>
      </div>

      <div className="text-sm min-h-6 leading-relaxed text-zinc-200">
        <span className="text-zinc-600 mr-2 font-mono">&gt;</span>
        <span className="select-none font-medium">
          {transcription || <span className="text-zinc-600 italic font-normal">Listening to speech...</span>}
          {recordingState === 'listening' && (
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1 h-3.5 bg-indigo-500 ml-1.5 align-middle" 
            />
          )}
        </span>
      </div>
    </motion.div>
  );
};
