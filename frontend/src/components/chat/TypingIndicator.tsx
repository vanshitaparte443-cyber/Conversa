import React from 'react';
import { motion } from 'framer-motion';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-3 py-3 px-4 max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900/50 border border-white/5 self-start shadow-sm">
      <div className="flex items-center gap-1">
        <motion.span 
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0, ease: 'easeInOut' }}
          className="w-1.5 h-1.5 rounded-full bg-zinc-400" 
        />
        <motion.span 
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.15, ease: 'easeInOut' }}
          className="w-1.5 h-1.5 rounded-full bg-zinc-400" 
        />
        <motion.span 
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
          className="w-1.5 h-1.5 rounded-full bg-zinc-400" 
        />
      </div>
      <span className="text-xs text-zinc-500 font-semibold tracking-wide uppercase">Partner is thinking</span>
    </div>
  );
};
