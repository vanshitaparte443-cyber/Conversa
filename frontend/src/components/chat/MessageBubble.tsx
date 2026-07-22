import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Message } from '../../types/chat';

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
      case 'karan': return 'from-amber-600 to-red-700';
      case 'ramesh': return 'from-[#27272A] to-[#3F3F46]';
      case 'shruti': return 'from-zinc-800 to-zinc-950';
      case 'babubhai': return 'from-emerald-600 to-teal-700';
      default: return 'from-gray-600 to-zinc-800';
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
        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${getAvatarColor(personaAvatarSeed)} flex items-center justify-center font-mono font-bold text-white text-xs shrink-0 shadow-xs border border-white`}>
          {personaName?.charAt(0) || 'P'}
        </div>
      )}

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#F4602A] flex items-center justify-center font-mono font-bold text-white text-xs shrink-0 shadow-xs">
          U
        </div>
      )}

      {/* Bubble Box */}
      <div className="flex flex-col gap-1.5">
        
        {/* Sender and Time */}
        <div className={`flex items-center gap-2 font-mono text-[10px] text-zinc-500 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="font-semibold text-zinc-700">{isUser ? 'You' : (personaName || 'Partner')}</span>
          <span>•</span>
          <span>{message.timestamp}</span>
        </div>

        {/* Message Container */}
        <div className={`relative px-4 py-3 rounded-2xl border transition-all duration-200 shadow-xs ${
          isUser 
            ? 'bg-[#F4602A] border-[#F4602A] text-white rounded-tr-xs'
            : 'bg-white border-[#E4E4E7] text-[#18181B] rounded-tl-xs'
        }`}>
          
          {/* Main conversation text */}
          <p className="font-sans text-[15px] leading-relaxed break-words whitespace-pre-wrap select-all font-normal">
            {message.text}
          </p>

          {/* Translation helper */}
          {message.translation && (
            <div className={`mt-2 pt-2 border-t border-dashed transition-all duration-200 ${
              showTranslation ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden mt-0 pt-0'
            } ${isUser ? 'border-orange-400/50' : 'border-zinc-200'}`}>
              <p className={`font-sans text-[13px] italic ${isUser ? 'text-orange-100' : 'text-zinc-500'}`}>
                {message.translation}
              </p>
            </div>
          )}

          {/* Controls inside Bubble */}
          {message.translation && (
            <div className={`flex items-center gap-2 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
              <button 
                onClick={() => setShowTranslation(!showTranslation)}
                className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 border transition-colors cursor-pointer ${
                  isUser
                    ? 'border-white/30 hover:bg-white/10 text-white'
                    : 'border-zinc-300 hover:bg-zinc-100 text-zinc-600'
                }`}
              >
                {showTranslation ? 'Hide Translation' : 'Show Translation'}
              </button>
            </div>
          )}

        </div>

      </div>

    </motion.div>
  );
};
