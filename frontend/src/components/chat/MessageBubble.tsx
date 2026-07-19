import React, { useState } from 'react';
import type { Message } from '../../types/chat';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: Message;
  personaAvatarSeed?: string;
  personaName?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, personaAvatarSeed, personaName }) => {
  const isUser = message.sender === 'user';
  const [showTranslation, setShowTranslation] = useState(false);

  const getAvatarColor = (seed?: string) => {
    switch (seed) {
      case 'karan': return 'from-amber-400/20 to-red-500/20 text-amber-300 border-amber-500/20';
      case 'ramesh': return 'from-purple-400/20 to-indigo-500/20 text-purple-300 border-purple-500/20';
      case 'shruti': return 'from-cyan-400/20 to-blue-500/20 text-cyan-300 border-cyan-500/20';
      case 'babubhai': return 'from-emerald-400/20 to-teal-500/20 text-emerald-300 border-emerald-500/20';
      default: return 'from-zinc-500/20 to-slate-600/20 text-zinc-300 border-zinc-500/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-3.5 max-w-[85%] md:max-w-[70%] ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}
    >
      
      {/* Avatar Icon */}
      {!isUser && (
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${getAvatarColor(personaAvatarSeed)} flex items-center justify-center font-bold text-sm shrink-0 border border-white/5 shadow-sm`}>
          {personaName?.charAt(0) || 'P'}
        </div>
      )}

      {isUser && (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-violet-600/20 text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-500/20 shadow-sm">
          U
        </div>
      )}

      {/* Bubble Box */}
      <div className="flex flex-col gap-1.5">
        
        {/* Sender and Time */}
        <div className={`flex items-center gap-2 text-[10px] text-zinc-500 font-semibold tracking-wider uppercase ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span>{isUser ? 'You' : (personaName || 'Partner')}</span>
          <span>•</span>
          <span>{message.timestamp}</span>
        </div>

        {/* Message Container */}
        <div className={`relative px-4.5 py-3 rounded-2xl border transition-all duration-300 shadow-sm ${
          isUser 
            ? 'bg-indigo-500/[0.06] border-indigo-500/30 text-white rounded-tr-none'
            : 'bg-zinc-900/50 border-white/5 text-zinc-100 rounded-tl-none'
        }`}>
          
          {/* Main conversation text (sans-serif for readability) */}
          <p className="text-[14px] leading-relaxed break-words whitespace-pre-wrap select-all font-medium">
            {message.text}
          </p>

          {/* Translation helper */}
          {message.translation && (
            <div className={`mt-2 pt-2 border-t border-dashed transition-all duration-200 ${
              showTranslation ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden mt-0 pt-0 border-transparent'
            } ${isUser ? 'border-indigo-500/15' : 'border-white/10'}`}>
              <p className="text-[13px] text-zinc-400 font-normal italic leading-relaxed">
                {message.translation}
              </p>
            </div>
          )}

          {/* Controls inside Bubble */}
          {message.translation && (
            <div className={`flex items-center gap-2 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
              <button 
                onClick={() => setShowTranslation(!showTranslation)}
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg flex items-center gap-1 border transition-colors cursor-pointer ${
                  showTranslation
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                    : 'bg-white/5 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'
                }`}
              >
                <Globe className="w-3 h-3" />
                {showTranslation ? 'Hide translation' : 'Translate'}
              </button>
            </div>
          )}

        </div>

      </div>

    </motion.div>
  );
};
