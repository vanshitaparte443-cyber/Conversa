import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Message } from '../../types/chat';
import { Languages, Sparkles } from 'lucide-react';

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
      case 'karan': return 'from-amber-500 via-orange-600 to-red-600';
      case 'ramesh': return 'from-[#A8562E] via-[#E8A33D] to-[#F4602A]';
      case 'shruti': return 'from-indigo-600 via-purple-600 to-pink-600';
      case 'babubhai': return 'from-emerald-600 to-teal-700';
      default: return 'from-slate-700 to-slate-900';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className={`flex gap-3 max-w-[88%] md:max-w-[72%] ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}
    >
      
      {/* Avatar Icon with Pulse Halo */}
      {!isUser && (
        <div className="relative group shrink-0 self-end mb-1">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${getAvatarColor(personaAvatarSeed)} flex items-center justify-center font-mono font-bold text-white text-xs shadow-md border-2 border-white transition-transform duration-200 group-hover:scale-110`}>
            {personaName?.charAt(0) || 'P'}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-xs animate-pulse" />
        </div>
      )}

      {isUser && (
        <div className="relative group shrink-0 self-end mb-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-500 flex items-center justify-center font-mono font-bold text-white text-xs shadow-md border-2 border-white transition-transform duration-200 group-hover:scale-110">
            U
          </div>
        </div>
      )}

      {/* Bubble Box */}
      <div className="flex flex-col gap-1">
        
        {/* Sender and Time */}
        <div className={`flex items-center gap-2 font-mono text-[10px] text-slate-400 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="font-semibold text-slate-600">{isUser ? 'You' : (personaName || 'Partner')}</span>
          <span>•</span>
          <span>{message.timestamp}</span>
        </div>

        {/* Message Container */}
        <div className={`relative px-4 py-3 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
          isUser 
            ? 'bg-gradient-to-r from-[#A8562E] to-[#F4602A] border-[#A8562E]/30 text-white rounded-tr-xs'
            : 'bg-white/90 backdrop-blur-md border-slate-200/80 text-slate-800 rounded-tl-xs hover:border-amber-300'
        }`}>
          
          {/* Main conversation text */}
          <p className="font-sans text-[15px] leading-relaxed break-words whitespace-pre-wrap select-all font-normal">
            {message.text}
          </p>

          {/* Translation helper */}
          <AnimatePresence>
            {message.translation && showTranslation && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.25 }}
                className={`pt-2 border-t border-dashed ${isUser ? 'border-white/30 text-amber-100' : 'border-slate-200 text-slate-600'}`}
              >
                <p className="font-sans text-[13px] italic flex items-start gap-1.5">
                  <Languages className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
                  <span>{message.translation}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls inside Bubble */}
          {message.translation && (
            <div className={`flex items-center gap-2 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
              <motion.button 
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTranslation(!showTranslation)}
                className={`font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-lg flex items-center gap-1.5 border transition-colors cursor-pointer ${
                  isUser
                    ? 'border-white/40 hover:bg-white/15 text-white'
                    : 'border-slate-300/80 hover:bg-amber-50 text-slate-600 hover:text-amber-800 hover:border-amber-300'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                {showTranslation ? 'Hide Translation' : 'Translate'}
              </motion.button>
            </div>
          )}

        </div>

      </div>

    </motion.div>
  );
};

